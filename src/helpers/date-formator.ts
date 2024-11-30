export function formatDateTime(dateinstring: string) {
    const date = new Date(dateinstring);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const diff = tomorrow.getTime() - now.getTime();

    if (diff < 86400000) { // Less than a day
        return `${date.toLocaleString('en', { weekday: 'long' })} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() < 12 ? 'am' : 'pm'}`;
    } else {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate().toString().padStart(2, '0')}${monthNames[date.getMonth()]} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() < 12 ? 'am' : 'pm'}`;
    }
}
export function formatDate(dateinstring: string) {
    const date = new Date(dateinstring);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const diff = tomorrow.getTime() - now.getTime();

    if (diff < 86400000) { // Less than a day
        return `${date.toLocaleString('en', { weekday: 'long' })}`;
    } else {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate().toString().padStart(2, '0')}${monthNames[date.getMonth()]}`;
    }
}
