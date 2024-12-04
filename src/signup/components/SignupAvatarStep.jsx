import {
  Alert,
  Avatar,
  Badge,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useController, useFormContext } from "react-hook-form";
import { useGetSignupAvatars } from "../../hooks/api/users/useUsers";
import { i18nFormError } from "../../utils/i18n";

export const SignupAvatarStep = () => {
  const { control } = useFormContext();
  const { data: avatars } = useGetSignupAvatars();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: "icon_id",
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
          sx={{
            flexDirection: ["column", "row"],
          }}
        >
          {avatars?.map((item) => (
            <FormControlLabel
              key={item._id}
              value={item._id}
              control={
                <Radio
                  icon={
                    <Stack>
                      <Avatar
                        src={item.url}
                        sx={{
                          width: 150,
                          height: 150,
                        }}
                      />
                      <Typography variant="subtitle" align="center">
                        {item.label}
                      </Typography>
                    </Stack>
                  }
                  checkedIcon={
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <CheckCircleRoundedIcon
                          color="success"
                          fontSize="large"
                        />
                      }
                    >
                      <Stack>
                        <Avatar
                          src={item.url}
                          sx={{
                            width: 150,
                            height: 150,
                          }}
                        />
                        <Typography
                          variant="subtitle"
                          align="center"
                          // color="primary.dark"
                          fontWeight="bold"
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    </Badge>
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
