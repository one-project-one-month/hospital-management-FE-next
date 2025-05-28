import { IMedicine } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MedicineInterface {
  medicines: IMedicine[] | null;
}

const initialState: MedicineInterface = {
  medicines: null,
};

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    storeMedicine(state, action: PayloadAction<IMedicine[] | null>) {
      state.medicines = action.payload;
    },
  },
});

export const { storeMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;
