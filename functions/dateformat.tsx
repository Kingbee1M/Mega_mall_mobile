export const formatDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/").map(Number);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `${day} ${monthNames[month - 1]} ${year}`;
};
