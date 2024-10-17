import { MarketConsumableForm } from "./MarketConsumableForm";
import { MarketIconForm } from "./MarketIconForm";

export const MarketItemForm = ({ type, marketItem, formRef, onSubmit }) => {
  switch (type) {
    case "ICON":
      return (
        <MarketIconForm
          marketItem={marketItem}
          onSubmit={onSubmit}
          ref={formRef}
        />
      );
    case "CONSUMABLE":
      return (
        <MarketConsumableForm
          marketItem={marketItem}
          onSubmit={onSubmit}
          ref={formRef}
        />
      );
    default:
      <></>;
  }
};
