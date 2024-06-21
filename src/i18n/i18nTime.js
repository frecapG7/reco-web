// Create an instance of Intl.RelativeTimeFormat
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Helper function to calculate relative time
export const i18nRelativeDate = (date) => {
  const now = new Date();
  const diff = now - new Date(date);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  } else if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  } else if (hours < 24) {
    return rtf.format(-hours, "hour");
  } else if (days < 7) {
    return rtf.format(-days, "day");
  } else if (weeks < 4) {
    return rtf.format(-weeks, "week");
  } else if (months < 12) {
    return rtf.format(-months, "month");
  } else {
    return rtf.format(-years, "year");
  }
};
