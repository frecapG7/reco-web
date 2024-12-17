import {
  Box,
  Container,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useGetTokens } from "../../hooks/api/tokens/useTokens";
import { useState } from "react";

import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";

export const TokensAdministration = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const { data: page } = useGetTokens(pageSize, pageNumber);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Box>
          <List>
            {page?.results?.map((token) => (
              <ListItem key={token.id}>
                <ListItemIcon>
                  <Icon color="secondary" variant="contained">
                    {token?.used ? <KeyOffIcon /> : <KeyIcon />}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={token.type} secondary={token.value} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box alignSelf="bottom">
          <Pagination
            count={page?.pagination?.totalPages}
            page={pageNumber}
            onChange={(event, value) => setPageNumber(value)}
          />
        </Box>
      </Box>
    </Container>
  );
};
