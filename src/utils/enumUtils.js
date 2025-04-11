import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export const STORE_ITEM_TYPE = new Map([
  ["IconItem", { icon: FaceRetouchingNaturalOutlinedIcon, label: "Avatar" }],
  ["ConsumableItem", { icon: LocalDiningOutlinedIcon, label: "Consumable" }],
  ["ProviderItem", { icon: LocalDiningOutlinedIcon, label: "Provider" }],
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

export const REQUEST_TYPE = new Map([
  ["BOOK", { icon: MenuBookOutlinedIcon, label: "Book request" }],
  ["SONG", { icon: AudiotrackOutlinedIcon, label: "Song request" }],
  ["MOVIE", { icon: MovieOutlinedIcon, label: "Movie request" }],
]);

export const enumIcon = (value, values) => {
  return values?.get(value)?.icon || value;
};

export const enumLabel = (value, values) => {
  return values?.get(value)?.label || value;
};
