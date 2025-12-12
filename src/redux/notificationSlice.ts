import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Note = {
  id: string;
  message: string;
  seen: boolean;
  time: string; 
  scheduledTime?: string | null;
};

type State = { notes: Note[] };

const initialState: State = {
  notes: JSON.parse(localStorage.getItem("notifications") || "[]"),
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNote: (
      state,
      action: PayloadAction<{ message: string; scheduledTime?: string }>
    ) => {
      state.notes.unshift({
        id: uuidv4(),
        message: action.payload.message,
        seen: false,
        time: new Date().toLocaleString(),
        scheduledTime: action.payload.scheduledTime || null,
      });

      localStorage.setItem("notifications", JSON.stringify(state.notes));
    },

    markSeen: (state, action: PayloadAction<{ id: string }>) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) note.seen = true;
      localStorage.setItem("notifications", JSON.stringify(state.notes));
    },

    markAllSeen: (state) => {
      state.notes.forEach((n) => (n.seen = true));
      localStorage.setItem("notifications", JSON.stringify(state.notes));
    },

    removeNote: (state, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload.id);
      localStorage.setItem("notifications", JSON.stringify(state.notes));
    },
  },
});

export const { pushNote, markSeen, markAllSeen, removeNote } = slice.actions;
export default slice.reducer;
