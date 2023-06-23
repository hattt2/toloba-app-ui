import { createAsyncThunk } from "@reduxjs/toolkit";

// service imports
import jamaatsService from "../../services/jamaatsService";

// store imports
import { bulkAdd } from "./JamaatsSlice";

export const fetchJamaats = createAsyncThunk(
  "jamaats/fetchJamaats",
  async (_payload, { dispatch }) => {
    let offset = 0;
    let jamaats = [];

    while (true) {
      const { data: resData } = await jamaatsService.fetchJamaatList(offset);
      jamaats = jamaats.concat(resData.records);
      offset = resData.offset;
      if (!offset) break;
    }

    dispatch(bulkAdd(jamaats));
  }
);
