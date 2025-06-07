import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sessionActions } from '../store/gameSessionSlice';
import { time } from 'framer-motion';


const Timer = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(15);
  const winner = useSelector((state) => state.board.winner);
  const playerTurn = useSelector((state) => state.session.playerTurn);

  useEffect(() => {
    if (winner) return;

    if (timeLeft === 0) {
      dispatch(sessionActions.togglePlayerTurn())
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, dispatch, winner])

  useEffect(() => {
    setTimeLeft(15);
  }, [playerTurn]);

  return (
    <div className={`HeadingL ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
      {timeLeft}s
    </div>
  )
}

export default Timer