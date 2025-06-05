import React from 'react'
import whiteBoardSmall from '../assets/images/board-layer-white-small.svg';
import whiteBoardLarge from '../assets/images/board-layer-white-large.svg';
import blackBoardSmall from '../assets/images/board-layer-black-small.svg';
import blackBoardLarge from '../assets/images/board-layer-black-large.svg';

import counterRedSmall from '../assets/images/counter-red-small.svg';
import counterRedLarge from '../assets/images/counter-red-large.svg';
import counterYellowSmall from '../assets/images/counter-yellow-small.svg';
import counterYellowLarge from '../assets/images/counter-yellow-large.svg';

import { useSelector, useDispatch } from 'react-redux';
import { boardActions } from '../store/gameBoardSlice';
import { sessionActions } from '../store/gameSessionSlice';
import { motion } from 'framer-motion';



const Gameboard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.board);
  const playerTurn = useSelector((state) => state.session.playerTurn) 
  const playerTokenSmall = playerTurn === "player1 || you" ? counterRedSmall : counterYellowSmall;
  const playerTokenLarge = playerTurn === "player1 || you" ? counterRedLarge : counterYellowLarge;

  const playerMove = (column, playerId) => {
    dispatch(boardActions.makeMove({ column, playerId }));
    dispatch(boardActions.checkGameResult());
    dispatch(sessionActions.togglePlayerTurn());
  }
  return (
    <div className="relative w-full max-w-[min(90vw,600px)] mx-auto">

      <picture className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <source media="(min-width: 668px)" srcSet={blackBoardLarge} />
        <img src={blackBoardSmall} alt="black board" className="w-full" />
      </picture>


      <div className="absolute top-0 left-0 w-full h-full grid grid-rows-6 grid-cols-7 gap-1 z-20 px-[2%] py-[4%] pointer-events-none">
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
                      srcSet={playerTokenLarge}
                      media="(min-width: 768px)"
                    />
                    img
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
            className="cursor-pointer col-span-1"
            onClick={() => playerMove(colIndex, playerTurn)}
          />
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