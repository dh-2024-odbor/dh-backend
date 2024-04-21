export default (date: Date) => {
  const diff = timeBetween(date);
  if (diff < 1000) {
    return 'now';
  } else if (diff < 60000) {
    return `${Math.floor(diff / 1000)}s ago`;
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  } else {
    return `${Math.floor(diff / 86400000)}d ago`;
  }
}