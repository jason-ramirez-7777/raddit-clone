import { PostType } from "@/lib/interface";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PostState {
  posts: PostType[];
}

const initialState: PostState = {
  posts: []
};

export const fetchPosts = createAsyncThunk("post/fetchList", async () => {
  const response = await fetch("/api/post");
  const posts: PostType[] = await response.json();

  return posts;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state: PostState, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    }
  }
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;