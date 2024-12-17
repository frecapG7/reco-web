import { Badge, Box, Icon, Typography } from "@mui/material";
import { EnumIcon } from "../../icons/EnumIcon";
import { STORE_ITEM_TYPE } from "../../../utils/enumUtils";

export const StoreItemDetails = ({ icon, type, name, label, description }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
    >
      <Badge
        // component={Icon}
        badgeContent={
          <Icon variant="outlined" color="secondary">
            <EnumIcon value={type} values={STORE_ITEM_TYPE} />
          </Icon>
        }
        slotProps={{
          color: "secondary",
          fontSize: "large",
        }}
      >
        <Box
          sx={{
            // width: { xs: "10em", md: "25em" },
            // height: { xs: "10.5em", md: "27em" },
            backgroundColor: "primary.main",
            borderRadius: 5,
            padding: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={icon}
            alt={name}
            loading="lazy"
            sx={{
              width: { xs: "5em", md: "10em" },
            }}
          />
          <Typography variant="title" textAlign="center">
            {label}
          </Typography>
        </Box>
      </Badge>

      <Typography>{description}</Typography>
    </Box>
  );
};
