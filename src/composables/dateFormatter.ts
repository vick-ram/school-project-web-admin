export default function formatTimestamp(timestampStr: string): string {
  const date = new Date(timestampStr);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Nairobi',
  };
  let formattedDate = date.toLocaleString('en-KE', options);
  formattedDate = formattedDate.replace('am', 'AM').replace('pm', 'PM');

  return formattedDate;
}
