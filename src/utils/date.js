export const getDatePart = (date) => {
  const epochDate = Date.parse(date);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
    epochDate
  );
};

export const getTimePart = (date) => {
  const epochDate = Date.parse(date);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(epochDate);
};
