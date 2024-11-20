import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCards } from "./card-actions";
import { createCard } from "./card-actions";
import { Card as CardT } from "@/App";

export type Status = {
  info: CardT[];
  status: string;
  loading: boolean;
  successMessage: string;
  error: string;
};

const initialState: Status = {
  info: [],
  status: "",
  loading: true,
  successMessage: "",
  error: "",
};

export const cardSlice = createSlice({
  name: "CardSlice",
  initialState,
  reducers: {
    toogleActive: (state, action: PayloadAction<number>) => {
      const cardItem = state.info.filter((card) => card.id == action.payload);
      cardItem[0].active = !cardItem[0].active;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get all cards
      .addCase(getCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCards.fulfilled, (state, action: PayloadAction<CardT[]>) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "All ok!";
        state.info = [...action.payload].map((card) => ({
          ...card,
          active: false,
        }));
      })
      .addCase(getCards.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
      })
      //Create card
      .addCase(createCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCard.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Card created";
      })
      .addCase(createCard.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
      });
  },
});

export const { toogleActive } = cardSlice.actions;
