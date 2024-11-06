import { useForm, useWatch } from "react-hook-form";
import { useEmbed } from "../../hooks/api/embed/useEmbed";
import { useEffect } from "react";
import { FormLink } from "../form/FormLink";

export const SearchLink = ({ onChange = () => {} }) => {
  const { control } = useForm();

  const value = useWatch({
    control,
    name: "value",
  });
  const { data: embed } = useEmbed(value);

  useEffect(() => {
    if (embed) {
      onChange({
        field1: embed.title,
        field2: embed.author,
        field3: embed.description,
        html: embed.html,
        url: embed.url,
        provider: embed.provider,
      });
    }
  });

  return <FormLink control={control} name="value" />;
};
