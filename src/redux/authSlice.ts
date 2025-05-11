import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  role: string | null;
}

const initialState: UserInterface = {
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserInterface>) {
      state = { role: action.payload.role };
    },
    logout(state) {
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
