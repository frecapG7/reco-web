import {
  Alert,
  Avatar,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import { useController, useFormContext } from "react-hook-form";
import { i18nFormError } from "../../i18n/i18nForm";
import { useTranslation } from "react-i18next";

const avatars = [
  {
    url: "https://storage.googleapis.com/reco_dev/avatars/avatar-batman-comics-svgrepo-com.svg",
    name: "RocoMan",
  },
  {
    url: "https://storage.googleapis.com/reco_dev/avatars/rookie_balboa_V1.svg",
    name: "Rookie Balboa",
  },
  {
    url: "https://storage.googleapis.com/reco_dev/avatars/avatar-15-svgrepo-com.svg",
    name: "Roco",
  },
];

export const SignupAvatarStep = () => {
  const { control } = useFormContext();

  const { t } = useTranslation();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: "defaultAvatar",
    defaultValue: "",
    rules: {
      required: {
        value: true,
        message: "Please select an avatar",
      },
    },
  });

  return (
    <>
      <Typography variant="label" sx={{ mt: 2 }}>
        {t("signup.avatar_disclaimer")}
      </Typography>
      <RadioGroup
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          // sx={{
          //   flexDirection: ["column", "row"],
          // }}
        >
          {avatars?.map((item) => (
            <FormControlLabel
              key={item.label}
              value={item.url}
              control={
                <Radio
                  icon={
                    <Stack alignItems="center">
                      <Avatar
                        src={item.url}
                        sx={{
                          width: 150,
                          height: 150,
                        }}
                      />
                      <Typography variant="label">{item.name}</Typography>
                    </Stack>
                  }
                  checkedIcon={
                    <Stack alignItems="center">
                      <Avatar
                        src={item.url}
                        sx={{
                          width: 150,
                          height: 150,
                          border: "5px solid",
                          borderColor: "success.main",
                        }}
                      />
                      <Typography variant="label" color="success">
                        {item.name}
                      </Typography>
                    </Stack>
                  }
                />
              }
            />
          ))}
        </Box>
      </RadioGroup>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {i18nFormError(error)}
        </Alert>
      )}
    </>
  );
};
