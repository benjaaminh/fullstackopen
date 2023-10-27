import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(state, action) {
      state = action.payload;
      return state;
    },
    removeNotification(state, action) {
      state = null;
      return state;
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(updateNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
