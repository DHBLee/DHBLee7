import re
import time
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Gmail API scope for reading and modifying mail
SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

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
    if label_name in label_cache:
        return label_cache[label_name]
    
    # Fetch all labels to check existence
    existing_labels_resp = service.users().labels().list(userId='me').execute()
    existing_labels = {l['name']: l['id'] for l in existing_labels_resp.get('labels', [])}
    
    if label_name in existing_labels:
        label_cache[label_name] = existing_labels[label_name]
        return existing_labels[label_name]

    # Create label if it doesn't exist
    label_body = {'name': label_name, 'labelListVisibility': 'labelShow', 'messageListVisibility': 'show'}
    created_label = service.users().labels().create(userId='me', body=label_body).execute()
    label_cache[label_name] = created_label['id']
    return created_label['id']

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
