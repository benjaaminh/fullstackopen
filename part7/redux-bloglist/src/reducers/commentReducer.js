import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const initialState = [{ id: 1, content: "helo" }];

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComments(comments));
  };
};

export const createComment = (id, object) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(id, object);
    dispatch(appendComment(newComment));
  };
};

export default commentSlice.reducer;
