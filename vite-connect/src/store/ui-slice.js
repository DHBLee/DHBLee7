import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { menuIsOpen: false, rulesIsOpen: false },
    reducers: {
        toggle(state, action) {
            if (action === "menu") {
                state.menuIsOpen = !state.menuIsOpen;
            } else if (action === "rules") {
                state.rulesIsOpen = !state.rulesIsOpen;
            }
        
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;