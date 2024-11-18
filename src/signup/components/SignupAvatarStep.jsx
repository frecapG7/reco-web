import {
  Avatar,
  Badge,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useGetFreeIconItems } from "../../hooks/api/market/useIconsStore";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useController, useFormContext } from "react-hook-form";

export const SignupAvatarStep = () => {
  const { control } = useFormContext();
  const { data } = useGetFreeIconItems();

  const {
    field: { onChange, value },
  } = useController({
    control,
    name: "icon_id",
    defaultValue: "",
    rules: { required: true },
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
          justifyContent="space-around"
          alignItems="center"
          sx={{
            flexDirection: ["column", "row"],
          }}
        >
          {data?.map((item) => (
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
    </>
  );
};
