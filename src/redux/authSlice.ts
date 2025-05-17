import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  user: {
    name: string;
    role: string;
  } | null;
}

const initialState: UserInterface = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
