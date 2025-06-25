import { createSlice } from "@reduxjs/toolkit";
import { boardActions } from "./gameBoardSlice";
const initialGameState = { players: [], gameMode: null, playerTurn: null, firstTurn: null, initialGameSetup: null}

const gameSessionSlice = createSlice({
    name: "gameSession",
    initialState: initialGameState,
    reducers: {
        incrementScore(state, action) {
            const playerId = action.payload;
            console.log(playerId)
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.score += 1;
            }
        },
        initializeGame(state, action) {
            const gameMode = action.payload
            state.players = [];
            state.gameMode = action.payload

            if (gameMode === "cpu") {
                state.players = [
                    { id: "you", name: "YOU", score: 0 },
                    { id: "cpu", name: "CPU", score: 0 }
                ]
                state.playerTurn="you";
            } else {
                state.players = [
                    { id: "player1", name: "PLAYER 1", score: 0 },
                    { id: "player2", name: "PLAYER 2", score: 0 }
                ]
                state.playerTurn="player1"
            }
            state.firstTurn = state.playerTurn;
            state.initialGameSetup = {
                gameMode,
                players: [...state.players]
            };
        },
        togglePlayerTurn(state) {
            const currentPlayerIndex = state.players.findIndex(
                player => player.id === state.playerTurn
            );
            const nextPLayerIndex = (currentPlayerIndex + 1) % state.players.length;
            state.playerTurn = state.players[nextPLayerIndex].id;
        },
        quitGame(state) {
            state.players = [];
            state.gameMode = null;
            state.playerTurn = null;
            state.initialGameSetup = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(boardActions.nextRound, (state) => {
            if (state.firstTurn === "cpu") {
                state.playerTurn = "you";
            } else if (state.firstTurn === "player2") {
                state.playerTurn = "player1"
            } else if (state.firstTurn === "player1") {
                state.playerTurn = "player2";
            } else {
                state.playerTurn = "cpu";
            }
            state.firstTurn = state.playerTurn;
        }),
        
        builder.addCase(boardActions.resetBoard, (state) => {
            state.playerTurn = state.firstTurn;
        })
    }
});

export const sessionActions = gameSessionSlice.actions;
export default gameSessionSlice.reducer;