import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetToken } from "../hooks/api/tokens/useTokens";
import { useEffect } from "react";

export const Redirection = () => {
  const [searchParams] = useSearchParams();

  const { data: token } = useGetToken(searchParams.get("token"));
  const navigate = useNavigate();
  useEffect(() => {
    switch (token?.type) {
      case "PASSWORD_RESET":
        navigate("/reset-password", { state: { token: token?.value } });
        break;
      default:
        break;
    }
  }, [token]);

  return (
    <Box>
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
