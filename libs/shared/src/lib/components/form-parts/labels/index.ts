export const formatLabel = (key: string) =>
  key.charAt(0).toUpperCase() +
  key
    .slice(1)
    .replace(/([A-Z])/g, " $1")
    .trim();
