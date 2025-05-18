export const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatArrivingDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'long',
    day: 'numeric',
  });
};