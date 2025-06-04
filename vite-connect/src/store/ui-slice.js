import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { menuIsOpen: false, rulesIsOpen: false },
    reducers: {
        toggle(state, action) {
            if (action.payload === "menu") {
                state.menuIsOpen = !state.menuIsOpen;
            } else if (action.payload === "rules") {
                state.rulesIsOpen = !state.rulesIsOpen;
            } 
        },
        closeModal(state) {
            state.menuIsOpen = false;
            state.rulesIsOpen = false;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;