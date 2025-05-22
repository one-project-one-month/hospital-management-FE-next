import { IPatient } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PatientInterface {
  patients: IPatient[] | null;
}

const initialState: PatientInterface = {
  patients: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    storePatient(state, action: PayloadAction<IPatient[] | null>) {
      state.patients = action.payload;
    },
  },
});

export const { storePatient } = patientSlice.actions;
export default patientSlice.reducer;
