import {
  Box,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetTokens } from "../../hooks/api/tokens/useTokens";
import { useState } from "react";

import { i18nDateTime } from "../../utils/i18n";

export const TokensAdministration = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: page } = useGetTokens(10, pageNumber);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {page?.results?.map((token, index) => (
                <TableRow key={index}>
                  <TableCell>{token.type}</TableCell>
                  <TableCell>{i18nDateTime(token.created)}</TableCell>
                  <TableCell>{i18nDateTime(token.expiration)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
