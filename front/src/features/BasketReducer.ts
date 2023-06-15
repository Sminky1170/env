import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SKIPCOUNT } from "../utils/validate";

interface BasketState {
  items: any[];
  total: number;
  isClicked: boolean;
  item: Object;
}

const initialState: BasketState = {
  items: [],
  total: 0,
  isClicked: false,
  item: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setIsClicked: (state, action: PayloadAction<BasketState["isClicked"]>) => {
      if (action?.payload !== null) {
        state.isClicked = action.payload;
      }
    },
    setThisItem: (state, action: PayloadAction<BasketState["item"]>) => {
      if (action?.payload !== null) {
        state.isClicked = true;
        Object.assign(state.item, action?.payload);
      }
    },
    addThisItem: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        const itemId = action?.payload?.data?._id;
        if (itemId && !state.items.includes(itemId)) {
          state.items.push(itemId);
        }
      }
    },
    resetItem: (state) => {
      state.item = {};
      state.isClicked = false;
    },
  },
});

export const { setIsClicked, setThisItem, addThisItem, resetItem } =
  basketSlice.actions;
export default basketSlice.reducer;
