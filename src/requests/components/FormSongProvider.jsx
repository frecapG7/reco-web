import {
  Box,
  FormControl,
  ListItemIcon,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useController } from "react-hook-form";
import { useGetProviders } from "../../hooks/api/recommendations/recommendations";
import LockIcon from "@mui/icons-material/Lock";
import { useMemo } from "react";

export const FormSongProvider = ({ control, requestType }) => {
  const { data: providers } = useGetProviders(requestType);

  const defaultValue = useMemo(() => {
    switch (requestType) {
      case "SONG":
        return "DEEZER";
      case "BOOK":
        return "OPENLIBRARY";
      default:
        return "";
    }
  }, [requestType]);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: "provider",
    defaultValue,
  });

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{
          "aria-label": "Without label",
          sx: {
            p: 1,
            border: "none",
          },
        }}
      >
        {providers?.map((provider) => (
          <MenuItem
            key={provider.name}
            value={provider.name}
            disabled={!provider.available}
            title="tototo"
          >
            <ListItemIcon>
              <Box
                component="img"
                src={provider.icon}
                alt={provider.name}
                height={30}
                width={50}
              />
            </ListItemIcon>
            {!provider.available && (
              <Tooltip title="This provider is not available for this request type">
                <LockIcon />
              </Tooltip>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
