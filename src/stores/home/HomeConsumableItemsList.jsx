import { useGetConsumableItems } from "../../hooks/api/market/useMarket";
import { useNavigate } from "react-router-dom";
import { ConsumableItemList } from "../components/ConsumableItemList";

export const HomeConsumableItemsList = () => {
  const { data: iconItems } = useGetConsumableItems();

  const navigate = useNavigate();

  return (
    <>
      <ConsumableItemList
        consumables={iconItems?.results}
        onClick={(icon) => navigate(`./consumables/${icon.id}`)}
      />
    </>
  );
};
