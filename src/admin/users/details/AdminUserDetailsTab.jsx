import { useOutletContext } from "react-router-dom";
import { i18nDateTime } from "../../../utils/i18n";
import { Typography } from "@mui/material";

export const AdminUserDetailsTab = () => {
  const { user } = useOutletContext();

  return (
    <>
      <div>todo</div>
      <Typography>Created on {i18nDateTime(user?.created)}</Typography>
    </>
  );
};
