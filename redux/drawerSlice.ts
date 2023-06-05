import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  drawerStatus: boolean;
}

const initialState: DrawerState = {
  drawerStatus: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    updateDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerStatus = action.payload;
    },
  },
});

export const { updateDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
