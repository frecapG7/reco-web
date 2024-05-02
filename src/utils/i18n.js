export const i18nDate = (date) => {
  return Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const i18nFormError = (error) => {
  if (error?.message) return error.message;
  switch (error?.type) {
    case "required":
      return "This field is required";
    case "minLength":
      return "This field is too short";
    case "maxLength":
      return "This field is too long";
    case "pattern":
      return "This field is invalid";
    default:
      return "";
  }
};
