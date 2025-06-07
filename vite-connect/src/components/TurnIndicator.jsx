import React from 'react'
import backgroundRed from '../assets/images/turn-background-red.svg';
import backgroundYellow from '../assets/images/turn-background-yellow.svg';
import Timer from './Timer';
import { useSelector, useDispatch } from 'react-redux';
import Button from './UI/Button';
import { sessionActions } from '../store/gameSessionSlice';
import { boardActions } from '../store/gameBoardSlice';


const TurnIndicator = () => {
  const dispatch = useDispatch();
  const playerTurn = useSelector(state => state.session.playerTurn);
  const winner = useSelector((state) => state.board.winner);
  const gameStatus = useSelector((state) => state.board.status);

  const isplayerTurnRed = playerTurn === "player1" || playerTurn === "you";

  const anotherRound = () => {
      dispatch(sessionActions.incrementScore(winner));
      dispatch(boardActions.resetBoard())
  }

  return (
    <div className={`w-full ${winner ? (winner === "player1" || winner === "you" ? "bg-Pink" : "bg-Yellow") : "bg-Purple"} rounded-t-[3.5rem] mt-[-2.6rem] pb-[96px] md:pb-[84px] 1440:pb-[50px]`}>
      <div className='relative w-max mx-auto'>
        {gameStatus === "win" ? (
            <div className='relative z-40 grid px-[74px] py-[17px] bg-white border-3 rounded-3xl shadow-[0px_7px_0px_0px_black]'>
              <div className='grid text-black text-center'>
                {gameStatus === "draw" ? (<h1 className='uppercase HeadingL'>it's a tie</h1>) : 
                  <>
                    <h3 className='uppercase HeadingXS'>{winner}</h3>
                    <h1 className='HeadingL'>WINS</h1>
                  </>
                }
              </div>
              <Button textOnly={true} onClick={anotherRound} extraStyles='mx-auto'>PLAY AGAIN</Button>
            </div>
        ) : (
          <>
            <img 
            src={isplayerTurnRed ? backgroundRed : backgroundYellow} 
            alt="A Background" 
            className='relative z-40 w-full h-auto' 
          />
        
          <div className={`${isplayerTurnRed ? "text-white" : "text-black"} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full text-center`}>
            <h3 className='HeadingXS flex gap-1  justify-center items-center'>
              <span className='uppercase'>{playerTurn}'s</span> 
              TURN
            </h3>
            <Timer />
          </div>
          </>)
        }
      </div>
    </div>
  )
}

export default TurnIndicator