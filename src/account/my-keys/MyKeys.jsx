import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { useAuthSession } from "../../context/AuthContext";

import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import { useGetUserTokens } from "../../hooks/api/users/useUsers";

export const MyKeys = () => {
  const { session } = useAuthSession();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: page } = useGetUserTokens(
    session.user.id,
    pageSize,
    pageNumber,
    {
      enabled: !!session.user,
    }
  );
  return (
    <Container
      sx={{
        my: 4,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <KeyIcon />
        <Typography variant="h4">Keys</Typography>
      </Box>

      <List>
        {page?.results.map((token, index) => (
          <ListItem
            key={index}
            secondaryAction={<Paper>{Boolean(token?.used)}</Paper>}
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={token.type} secondary={token.value} />
          </ListItem>
        ))}
      </List>

      <Box align="center" width="100%">
        <Pagination count={page?.pagination.totalPages || 0} />
      </Box>
    </Container>
  );
};
