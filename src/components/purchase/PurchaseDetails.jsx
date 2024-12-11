import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { i18nDateTime } from "../../utils/i18n";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import NorthEastOutlinedIcon from "@mui/icons-material/NorthEastOutlined";
import { useNavigate } from "react-router-dom";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";

export const PurchaseDetails = ({ purchase }) => {
  const navigate = useNavigate();

  if (!purchase)
    return (
      <Grid container width="100%" spacing={2}>
        <Grid size={{ xs: 12, sm: 9 }}>
          <Card elevation={0}>
            <CardHeader
              avatar={<Avatar />}
              title={<Skeleton variant="text" />}
              subheader={<Skeleton variant="text" />}
            />
            <CardContent>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="rectangular" height={118} />
          </Stack>
        </Grid>
      </Grid>
    );
  return (
    <Grid container width="100%" spacing={2}>
      <Grid size={{ xs: 12, sm: 9 }}>
        <Card elevation={0}>
          <CardHeader
            avatar={<Avatar src={purchase.icon} width={150} height={150} />}
            title={purchase.name}
            subheader={purchase.type}
            action={
              <Stack spacing={1} direction="row">
                <IconButton variant="contained" color="primary">
                  <ShieldOutlinedIcon />
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/stores/${purchase.item.id}`)}
                >
                  <NorthEastOutlinedIcon />
                </IconButton>
              </Stack>
            }
          />
          <CardContent>
            <Typography variant="body1">
              {purchase.item?.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Stack>
          <Typography variant="h6">Purchase Details</Typography>
          <Paper
            sx={{
              px: 0,
            }}
          >
            <Stack spacing={1} p={2}>
              <>
                <Typography fontWeight="bold" variant="body2">
                  Purchase ID
                </Typography>
                <Typography variant="body2">{purchase?.id}</Typography>
              </>
              <>
                <Typography fontWeight="bold" variant="body2">
                  Price
                </Typography>
                <Typography variant="body2">
                  {purchase?.payment_details.price} <DiamondRoundedIcon />
                </Typography>
              </>
              <>
                <Typography fontWeight="bold" variant="body2">
                  Date
                </Typography>
                <Typography variant="body2">
                  {i18nDateTime(purchase?.createdAt)}
                </Typography>
              </>
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};
