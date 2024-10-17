import { StoreItemCard } from "../../components/store/StoreItemCard";

export const IconItemCard = ({ item, onClick }) => {
  return (
    <StoreItemCard
      label={item.label}
      name={item.name}
      description={item.description}
      icon={item.url}
      price={item.price}
      onClick={onClick}
    />
  );
};
