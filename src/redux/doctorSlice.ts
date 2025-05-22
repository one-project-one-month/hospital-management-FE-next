import { IDoctor } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorInterface {
  doctors: IDoctor[] | null;
}

const initialState: DoctorInterface = {
  doctors: null,
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    storeDoctor(state, action: PayloadAction<IDoctor[] | null>) {
      state.doctors = action.payload;
    },
  },
});

export const { storeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
