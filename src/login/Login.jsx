import { Container } from "@mui/material";
import { LoginDialog } from "../components/dialog/LoginDialog";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LoginDialog
        open={true}
        onClose={() => {}}
        onSuccess={() => navigate("/", { replace: true })}
      />
    </Container>
  );
};
