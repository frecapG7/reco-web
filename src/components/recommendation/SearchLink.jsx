import { useForm, useWatch } from "react-hook-form";
import { useEmbed } from "../../hooks/api/embed/useEmbed";
import { useEffect } from "react";
import { FormLink } from "../form/FormLink";

export const SearchLink = ({ onChange = () => {} }) => {
  const {
    control,
    formState: { isValid },
  } = useForm({
    reValidateMode: "onChange",
  });

  const value = useWatch({
    control,
    name: "value",
  });

  const enabled = !!value && isValid;

  const { data: embed } = useEmbed(value, {
    enabled: enabled,
  });

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

  return <FormLink control={control} name="value" rules={{ required: true }} />;
};
