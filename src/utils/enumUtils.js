import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";

export const STORE_ITEM_TYPE = new Map([
  ["IconItem", { icon: FaceRetouchingNaturalOutlinedIcon, label: "Avatar" }],
  ["ConsumableItem", { icon: LocalDiningOutlinedIcon, label: "Consumable" }],
]);

export const PURCHASE_TYPE = new Map([
  [
    "IconPurchase",
    { icon: FaceRetouchingNaturalOutlinedIcon, label: "Avatar" },
  ],
  [
    "ConsumablePurchase",
    { icon: LocalDiningOutlinedIcon, label: "Consumable" },
  ],
]);

export const enumIcon = (value, values) => {
  return values?.get(value)?.icon || value;
};

export const enumLabel = (value, values) => {
  return values?.get(value)?.label || value;
};
