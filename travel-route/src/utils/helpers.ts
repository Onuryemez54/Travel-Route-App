export const countryCodeToFlagSrc = (countryCode: string) => {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
