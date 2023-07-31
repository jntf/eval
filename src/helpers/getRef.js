export default function generateRef() {
    const prefix = 'REF-';
    const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
    const uniqueId = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `${prefix}${dateTime}-${uniqueId}`;
};