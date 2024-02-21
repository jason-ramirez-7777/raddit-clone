import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/lib/interface";

const initialState: UserState = {
  name: "",
  email: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload;
    }
  }
});

export const { updateInfo } = userSlice.actions;
export default userSlice.reducer;