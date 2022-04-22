import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//createAsyncThunk is used to create action that will make calls to external API
//payload consists of data that we send to the external API in order to get results based on the data
export const fetchWeatherAction = createAsyncThunk(
  'weather/fetch',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=ed46c2013e179f9a2a95e02895e6ac9a`);
      return response.data;
    } catch(error) {
      if(!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//createSlice creates action creators and reducers.
//There are 3 states to be considered for each action type - pending, fulfilled, rejected
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.weather = action?.payload; //action && action.payload
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    })
  }
});

export default weatherSlice.reducer;