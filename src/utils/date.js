export const getDatePart = (date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(date);

export const getTimePart = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
