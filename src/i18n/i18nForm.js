export const i18nFormError = (error) => {
  if (error?.message) return `form.errors.${error.message}`;
  if (error?.type) return `form.errors.${error?.type}`;
};
