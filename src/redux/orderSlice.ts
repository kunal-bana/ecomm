import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../api/apiTypes";   


export interface OrderItem extends Product {
  quantity: number;
  images: string[];   
}

interface Track {
  status: string;
  time: string;
  note?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
  tracking: Track[];
  address?: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

interface State {
  orders: Order[];
}

const initialState: State = {
  orders: JSON.parse(localStorage.getItem("orders") || "[]"),
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(
      state,
      action: PayloadAction<{
        items: (Product & { quantity: number })[];
        total: number;
        address: Order["address"];
      }>
    ) {
     const formattedItems: OrderItem[] = action.payload.items.map((item) => ({...item,quantity: item.quantity,  
      images: [String(item.image)],        
    }));

      const newOrder: Order = {
        id: "ORD-" + Date.now(),
        items: formattedItems,
        total: action.payload.total,
        date: new Date().toLocaleString(),
        status: "Pending",
        tracking: [
          {
            status: "Pending",
            time: new Date().toLocaleString(),
            note: "Order placed",
          },
        ],
        address: action.payload.address,
      };

      state.orders.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    updateStatus(
      state,
      action: PayloadAction<{ orderId: string; status: string; note?: string }>
    ) {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (!order) return;

      order.status = action.payload.status;
      order.tracking.push({
        status: action.payload.status,
        time: new Date().toLocaleString(),
        note: action.payload.note,
      });

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    cancelOrder(state, action: PayloadAction<{ orderId: string }>) {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (!order) return;

      order.status = "Cancelled";
      order.tracking.push({
        status: "Cancelled",
        time: new Date().toLocaleString(),
        note: "User cancelled",
      });

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { placeOrder, updateStatus, cancelOrder } = slice.actions;
export default slice.reducer;
