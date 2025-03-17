import { useTranslation } from "react-i18next";

export const relativeTime = (date, language = "en") => {
  // Create an instance of Intl.RelativeTimeFormat
  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });

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

export const formatDate = (date, language = "en") => {
  return Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
export const formatDateTime = (date, language = "en") => {
  if (!date) return "";
  return Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};

export default () => {
  const { i18n } = useTranslation();

  return {
    relativeTime: (data) => relativeTime(data, i18n.language),
    formatDate: (data) => formatDate(data, i18n.language),
    formatDateTime: (data) => formatDateTime(data, i18n.language),
  };
};
