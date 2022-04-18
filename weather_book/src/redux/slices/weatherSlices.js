import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//createAsyncThunk is used to create action that will make calls to external API
//payload consists of data that we send to the external API in order to get results based on the data
export const fetchWeatherAction = createAsyncThunk(
  'weather/fetch',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
      return response;
    } catch(error) {

    }
  }
);

//createSlice creates action creators and reducers.
