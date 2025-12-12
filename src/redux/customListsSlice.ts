import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type WLItem = { productId: number; quantity: number };
type List = { id: string; listName: string; category?: string; items: WLItem[] };

type State = { lists: List[] };

const initialState: State = {
  lists: JSON.parse(localStorage.getItem("customLists") || "[]"),
};

const slice = createSlice({
  name: "customLists",
  initialState,
  reducers: {
    createList: (s, a: PayloadAction<{ name: string; category?: string }>) => {
      s.lists.unshift({
        id: uuidv4(),
        listName: a.payload.name,
        category: a.payload.category || "",
        items: [],
      });
      localStorage.setItem("customLists", JSON.stringify(s.lists));
    },
    removeList: (s, a: PayloadAction<{ id: string }>) => {
      s.lists = s.lists.filter((l) => l.id !== a.payload.id);
      localStorage.setItem("customLists", JSON.stringify(s.lists));
    },
    addToList: (
      s,
      a: PayloadAction<{ listId: string; productId: number; quantity: number }>
    ) => {
      const list = s.lists.find((x) => x.id === a.payload.listId);
      if (!list) return;
      const item = list.items.find((it) => it.productId === a.payload.productId);
      if (item) item.quantity += a.payload.quantity;
      else list.items.push({ productId: a.payload.productId, quantity: a.payload.quantity });
      localStorage.setItem("customLists", JSON.stringify(s.lists));
    },
    updateQty: (
      s,
      a: PayloadAction<{ listId: string; productId: number; quantity: number }>
    ) => {
      const list = s.lists.find((x) => x.id === a.payload.listId);
      if (!list) return;
      const item = list.items.find((it) => it.productId === a.payload.productId);
      if (item) item.quantity = a.payload.quantity;
      localStorage.setItem("customLists", JSON.stringify(s.lists));
    },
    removeItem: (s, a: PayloadAction<{ listId: string; productId: number }>) => {
      const list = s.lists.find((x) => x.id === a.payload.listId);
      if (!list) return;
      list.items = list.items.filter((it) => it.productId !== a.payload.productId);
      localStorage.setItem("customLists", JSON.stringify(s.lists));
    },
  },
});

export const { createList, removeList, addToList, updateQty, removeItem } = slice.actions;
export default slice.reducer;
