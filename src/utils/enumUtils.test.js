import { describe, expect, it } from "vitest";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import {
  enumIcon,
  PURCHASE_TYPE,
  REQUEST_TYPE,
  STORE_ITEM_TYPE,
} from "./enumUtils";

describe("Validate enumIcon", () => {
  it("should return the label", async () => {
    expect(enumIcon("nimportequoi", STORE_ITEM_TYPE)).toEqual("nimportequoi");
  });
  it("should return icons", async () => {
    expect(enumIcon("IconItem", STORE_ITEM_TYPE)).toEqual(
      FaceRetouchingNaturalOutlinedIcon
    );
    expect(enumIcon("ConsumableItem", STORE_ITEM_TYPE)).toEqual(
      LocalDiningOutlinedIcon
    );
    expect(enumIcon("IconPurchase", PURCHASE_TYPE)).toEqual(
      FaceRetouchingNaturalOutlinedIcon
    );
    expect(enumIcon("ConsumablePurchase", PURCHASE_TYPE)).toEqual(
      LocalDiningOutlinedIcon
    );

    expect(enumIcon("BOOK", REQUEST_TYPE)).toBeDefined();
  });
});
