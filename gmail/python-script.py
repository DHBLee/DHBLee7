import unicodedata
import re
import time
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Gmail API scope for reading and modifying mail
SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

def normalize_label_name(name):
    # Remove all whitespace, normalize unicode, lower case
    name = unicodedata.normalize('NFKC', name)
    name = re.sub(r'\s+', '', name)  # Remove all whitespace
    return name.lower()

def authenticate_gmail_api():
    flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)
    service = build('gmail', 'v1', credentials=creds)
    return service

def list_all_message_ids(service):
    message_ids = []
    page_token = None
    while True:
        response = service.users().messages().list(userId='me', pageToken=page_token, maxResults=500).execute()
        messages = response.get('messages', [])
        message_ids.extend([m['id'] for m in messages])
        page_token = response.get('nextPageToken')
        if not page_token:
            break
    return message_ids

def get_from_header(service, msg_id):
    msg = service.users().messages().get(userId='me', id=msg_id, format='metadata', metadataHeaders=['From']).execute()
    headers = msg.get('payload', {}).get('headers', [])
    from_header = ''
    for header in headers:
        if header['name'].lower() == 'from':
            from_header = header['value']
            break
    return from_header

def extract_display_name(from_header):
    # Extracts display name from "Display Name <email@domain.com>"
    match = re.match(r'^(.*?)\s*<.*?>$', from_header)
    if match:
        display_name = match.group(1).strip()
        if display_name:
            return display_name
    # If "From" is just email, return it instead
    return from_header.strip()

def ensure_label_exists(service, label_name, label_cache):
    label_name_clean = label_name.strip()
    normalized_name = normalize_label_name(label_name_clean)

    # Check cache
    if normalized_name in label_cache:
        return label_cache[normalized_name]

    # Fetch all labels
    existing_labels_resp = service.users().labels().list(userId='me').execute()
    user_labels = [l for l in existing_labels_resp.get('labels', []) if l['type'] == 'user']

    for label in user_labels:
        if normalize_label_name(label['name']) == normalized_name:
            label_cache[normalized_name] = label['id']
            print(f"Using existing label: '{label['name']}' (ID: {label['id']})")
            return label['id']

    # Label doesn't exist, try create
    label_body = {
        'name': label_name_clean,
        'labelListVisibility': 'labelShow',
        'messageListVisibility': 'show'
    }

    try:
        created_label = service.users().labels().create(userId='me', body=label_body).execute()
        label_cache[normalized_name] = created_label['id']
        print(f"Created new label: '{label_name_clean}' (ID: {created_label['id']})")
        return created_label['id']
    except HttpError as error:
        if error.resp.status == 409:
            # Conflict, refetch and check with normalization
            print(f"Label conflict for '{label_name_clean}', rechecking labels.")
            existing_labels_resp = service.users().labels().list(userId='me').execute()
            user_labels = [l for l in existing_labels_resp.get('labels', []) if l['type'] == 'user']
            for label in user_labels:
                if normalize_label_name(label['name']) == normalized_name:
                    label_cache[normalized_name] = label['id']
                    print(f"Found conflicting label: '{label['name']}' (ID: {label['id']})")
                    return label['id']
            print(f"Still could not find label '{label_name_clean}' even after conflict and normalization.")
        raise error


def apply_label(service, msg_id, label_id):
    try:
        service.users().messages().modify(userId='me', id=msg_id, body={'addLabelIds': [label_id]}).execute()
    except HttpError as error:
        print(f'Error applying label to message {msg_id}: {error}')

def main():
    service = authenticate_gmail_api()
    message_ids = list_all_message_ids(service)
    print(f'Total messages found: {len(message_ids)}')

    label_cache = {}  # Cache label name to ID for efficiency

    for idx, msg_id in enumerate(message_ids, start=1):
        from_header = get_from_header(service, msg_id)
        if not from_header:
            print(f'No From header found for message {msg_id}, skipping...')
            continue
        label_name = extract_display_name(from_header)
        label_id = ensure_label_exists(service, label_name, label_cache)
        apply_label(service, msg_id, label_id)

        if idx % 100 == 0:
            print(f'Processed {idx} messages...')
            time.sleep(1)  # Brief pause to avoid API quota issues

    print('Email categorization by sender display name complete.')

if __name__ == '__main__':
    main()
