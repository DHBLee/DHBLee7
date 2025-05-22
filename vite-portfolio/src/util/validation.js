export function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
export function isNotEmpty(value) {
    return value.trim().length > 0;
}