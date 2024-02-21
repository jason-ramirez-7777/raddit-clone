import { PostProps } from "@/lib/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PostList {
  list: PostProps[];
}

const initialState: PostList = {
  list: []
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateInfo: (state: PostList, action: PayloadAction<PostList>) => {
      state = action.payload;
    }
  }
});

export const { updateInfo } = postSlice.actions;
export default postSlice.reducer;