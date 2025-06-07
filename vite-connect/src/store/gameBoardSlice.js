import { createSlice } from "@reduxjs/toolkit";
import { checkDraw, checkWin, } from "../util/gameLogic";
import { sessionActions } from "./gameSessionSlice";

const initialBoardState = {
    board: Array(6).fill().map(() => Array(7).fill(null)),
    state: 'idle',
    lastMove: null,
    winner: null,
};

const gameBoardSlice = createSlice({
    name: "gameBoard",
    initialState: initialBoardState,
    reducers: {
        makeMove(state, action) {
            const { column, playerId } = action.payload;
            const newBoard = state.board.map(row => [...row]);

            for (let row = 5; row >= 0; row--) {
                if (!newBoard[row][column]) {
                    newBoard[row][column] = playerId;
         
                    return {
                        ...state,
                        board: newBoard,
                        lastMove: { row, column, playerId }
                    };
                }
            }
        },
        checkGameResult(state) {
            if (!state.lastMove) return;

            const { row, column, playerId } = state.lastMove;

            if (checkWin(state.board, row, column)) {
                state.status = 'win';
                state.winner = playerId
                console.log(state.winner)
            } else if (checkDraw(state.board)) {
                state.status = 'draw';
                state.winner = null;
            }
        },
        resetBoard(state) {
            state.board = initialBoardState.board;
            state.status = 'idle';
            state.winner = null;
        },
        setGameStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
});

export const boardActions = gameBoardSlice.actions;
export default gameBoardSlice.reducer;