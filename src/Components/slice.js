import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "./fetch";

const initialState = {
  news: [],
  loading: false,
};

export const getSportsNews = createAsyncThunk("news/getnews", async () => {
  try {
    const responce = await axios.get(`${config.Api}/sportsnews/getAllNews`);
    return responce.data;
  } catch (error) {
    throw error.responce.data;
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  extraReducers(buillder) {
    buillder
      .addCase(getSportsNews.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSportsNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getSportsNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default newsSlice.reducer
