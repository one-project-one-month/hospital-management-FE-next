import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
  role: string | null;
}

const initialState: UserInterface = {
  role: null,
};

//! Storing Auth Data in LocalStorage is Really Bad Idea.

const setCookie = (role: string | null) => {
  document.cookie = `role=${role}; path=/; max-age=86400`; // for middleware use
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserInterface>) {
      state.role = action.payload.role;
      setCookie(action.payload.role);
    },
    logout(state) {
      state.role = null;
      setCookie(null);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
