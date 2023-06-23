import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 0,
  totalRequest: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state, action) {
      return { ...state, totalRequest: state.totalRequest + 1 };
    },
    finishLoading(state, action) {
      return { ...state, loading: state.loading + 1 };
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export const getLoadStatus = (state) => {
  return state.loading.loading;
};

export const getTotalRequest = (state) => {
  return state.loading.totalRequest;
};
