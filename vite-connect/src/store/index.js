import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./gameSessionSlice";
import boardReducer from "./gameBoardSlice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { session: sessionReducer, board: boardReducer, ui: uiSlice  },
})

export default store;