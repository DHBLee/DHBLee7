import React, { useEffect } from 'react'
import whiteBoardSmall from '../assets/images/board-layer-white-small.svg';
import whiteBoardLarge from '../assets/images/board-layer-white-large.svg';
import blackBoardSmall from '../assets/images/board-layer-black-small.svg';
import blackBoardLarge from '../assets/images/board-layer-black-large.svg';

import counterRedSmall from '../assets/images/counter-red-small.svg';
import counterRedLarge from '../assets/images/counter-red-large.svg';
import counterYellowSmall from '../assets/images/counter-yellow-small.svg';
import counterYellowLarge from '../assets/images/counter-yellow-large.svg';

import markerRed from '../assets/images/marker-red.svg';
import markerYellow from '../assets/images/marker-yellow.svg';

import { useSelector, useDispatch } from 'react-redux';
import { boardActions } from '../store/gameBoardSlice';
import { sessionActions } from '../store/gameSessionSlice';
import { motion } from 'framer-motion';
import { checkWin } from '../util/gameLogic';



const Gameboard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.board);
  const playerTurn = useSelector((state) => state.session.playerTurn);
  const status = useSelector((state) => state.board.status); 
  const isDone = status !== "idle";
  console.log(isDone);

  const currentMarker = playerTurn === "you" || playerTurn === "player1" ? markerRed : markerYellow;

  const playerMove = (column, playerId) => {
    if (board[0][column] !== null) return;

    dispatch(boardActions.makeMove({ column, playerId }));
    dispatch(boardActions.checkGameResult());
    dispatch(sessionActions.togglePlayerTurn());
  }

  const stimulateMove = (board, column, playerId) => {
    const newBoard = board.map(row => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][column]) {
        newBoard[row][column] = playerId;
        return { newBoard, row };
      }
    }
    return null;
  }
  
  const computerMove = () => {
    const cpuId = "cpu";
    const playerId = "you";

    const availableColumns = board[0]
        .map((cell, index) => (cell === null ? index : null))
        .filter((col) => col !== null);

    if (availableColumns.length === 0) return;

    for (const col of availableColumns) {
      const tempCpuBoard = stimulateMove(board, col, cpuId);
      const tempPlayerBoard = stimulateMove(board, col, playerId);

      if (checkWin(tempCpuBoard.newBoard, tempCpuBoard.row, col)) {
        console.log('A');
        dispatch(boardActions.makeMove({ column: col, playerId: cpuId }));
        dispatch(boardActions.checkGameResult());
        dispatch(sessionActions.togglePlayerTurn());
        return
      } 
      
      if (checkWin(tempPlayerBoard.newBoard, tempPlayerBoard.row, col)) {
        console.log('B');
        dispatch(boardActions.makeMove({ column: col, playerId: cpuId }));
        dispatch(boardActions.checkGameResult());
        dispatch(sessionActions.togglePlayerTurn());
        return
      }
    }

    const randomCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    dispatch(boardActions.makeMove({ column: randomCol, playerId: cpuId }));
    dispatch(boardActions.checkGameResult());
    dispatch(sessionActions.togglePlayerTurn());
  }

  useEffect(() => {
    if (playerTurn === "cpu" && status === "idle") {
      const delay = setTimeout(() => {
        computerMove();
      }, 600);

      return () => clearTimeout(delay);
    }
  }, [playerTurn, status, board])

  return (
    <div className="relative w-full max-w-[min(90vw,600px)] mx-auto">

      <picture className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <source media="(min-width: 668px)" srcSet={blackBoardLarge} />
        <img src={blackBoardSmall} alt="black board" className="w-full" />
      </picture>


      <div className="absolute top-0 md:top-[-0.8rem] left-0 w-full h-full grid grid-rows-6 grid-cols-7 gap-1 z-20 px-[2%] py-[4%] pointer-events-none">
        {board.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="flex items-center justify-center">
              {cell && (
                <motion.div
                  className={`w-full h-full flex items-center justify-center `}
                  style={{ position: 'relative', zIndex: 10 }}
                  initial={{ y: `-${(rowIndex + 1) * 100}%`, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                >
                  <picture>
                    <source 
                      srcSet={cell === "player1" || cell === "you" ? counterRedLarge : counterYellowLarge}
                      media="(min-width: 696px)"
                    />
                    <img src={cell === "player1" || cell === "you" ? counterRedSmall : counterYellowSmall} alt="Player Token Small image" className='w-full'/>
                  </picture>
                </motion.div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-7 z-40">
        {board[0].map((_, colIndex) => (
          
          <div
            key={`col-${colIndex}`}
            className={`${isDone ? "cursor-not-allowed" : "cursor-pointer"} relative group col-span-1`}
            onClick={() => { if (!isDone && playerTurn !== "cpu") {playerMove(colIndex, playerTurn)} }}
          >
              <img src={currentMarker} alt="Background Red arrow"  className='hidden group-hover:block absolute top-[-1.5rem] md:top-[-2rem] left-1/2 -translate-x-1/2 w-6 md:w-8'/>
          </div> 
        ))}
      </div>

      <picture className="relative z-30">
        <source media="(min-width: 668px)" srcSet={whiteBoardLarge} />
        <img src={whiteBoardSmall} alt="white board" className="w-full" />
      </picture>

    </div>

  )
}

export default Gameboard