import { Badge, Box, Icon, Skeleton, Typography } from "@mui/material";
import { EnumIcon } from "../../icons/EnumIcon";
import { STORE_ITEM_TYPE } from "../../../utils/enumUtils";

export const StoreItemDetails = ({ icon, type, name, label, description }) => {
  if (!type)
    return (
      <Box>
        <Skeleton variant="rectangular" width={300} height={300} />
        <Skeleton variant="text" width={300} />
      </Box>
    );
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
    >
      <Badge
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
            backgroundColor: "primary.main",
            borderRadius: 5,
            padding: { xs: 4, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={icon}
            alt={name}
            loading="lazy"
            sx={{
              width: { xs: "4em", md: "7.5em" },
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
