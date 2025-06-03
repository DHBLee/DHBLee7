import Game from "./components/Game"
import { useSelector } from 'react-redux';
import Home from "./components/Home";

function App() {
  const gameMode = useSelector((state) => state.session?.gameMode);

  return (
    <>
      {gameMode !== null ? (
        <Game />
      ) :
      (
        <Home /> 
      )}
    </>
  )
}

export default App
