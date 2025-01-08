import { FormSelect } from "./FormSelect";
const englishFlag = String.fromCodePoint(0x1f1ec, 0x1f1e7);
const frenchFlag = String.fromCodePoint(0x1f1eb, 0x1f1f7);

export const FormLocale = ({ control, name, label }) => {
  return (
    <FormSelect
      control={control}
      name={name}
      label={label}
      options={[
        { value: "en", label: ` ${englishFlag} EN` },
        { value: "fr", label: `${frenchFlag} FR` },
      ]}
    />
  );
};
