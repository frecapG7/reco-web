import { Box, Skeleton, Typography } from "@mui/material";

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

      <div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </Box>
  );
};
