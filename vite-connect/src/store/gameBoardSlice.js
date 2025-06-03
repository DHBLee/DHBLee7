import { createSlice } from "@reduxjs/toolkit";
import { checkDraw, checkWin, } from "../util/gameLogic";
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

            for (let row = 5; row >= 0; row--) {
                if (!state.board[row][column]) {
                    state.board[row][column] = playerId;
                    state.lastMove = { row, column, playerId };
                    return;
                }
            }
        },
        checkGameResult(state) {
            if (!state.lastMove) return;

            const { row, column, playerId } = state.lastMove;

            if (checkWin(state.board, row, column)) {
                state.status = 'win';
                state.winner = playerId
            } else if (checkDraw(state.board)) {
                state.status = 'draw';
                state.winner = null;
            }
        },
        resetBoard(state) {
            state.board = initialBoardState.board;
            state.status = 'playing';
            state.lastMove = null;
        },
        setGameStatus(state, action) {
            state.status = action.payload;
        }
    }
});

export const boardActions = gameBoardSlice.actions;
export default gameBoardSlice.reducer;