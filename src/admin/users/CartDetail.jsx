import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { UserCart } from "../../components/user/cart/UserCart";

export const CartDetail = () => {
  //TODO: react query
  const cart = {};

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h4" align="center">
          Cart
        </Typography>
        <AccordionDetails>
          <UserCart cart={cart} />
        </AccordionDetails>
      </AccordionSummary>
    </Accordion>
  );
};
