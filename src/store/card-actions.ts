import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const getCards = createAsyncThunk("getCards", async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

type cardInfo = {
  front: string;
  back: string;
};

type cardType = {
  card: cardInfo;
  onAfterCreate: () => void;
};

export const createCard = createAsyncThunk(
  "createCards",
  async (cardObj: cardType) => {
    try {
      const response = await axiosInstance.post("/", cardObj.card);
      if (response.data) {
        cardObj.onAfterCreate();
      }
      return response.data;
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);


type cardDeleteType = {
  id:number;
  onAfterDelete:()=> void
}

export const deleteCard = createAsyncThunk(
  "deleteCard",
  async (cardObj:cardDeleteType) => {
    try {
      await axiosInstance.delete(`/${cardObj.id}`);
      cardObj.onAfterDelete();

    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);
