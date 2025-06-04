import Game from "./components/Game"
import { useSelector } from 'react-redux';
import Home from "./components/Home";
import Modal from "./components/UI/Modal";

function App() {
  const gameMode = useSelector((state) => state.session?.gameMode);

  return (
    <main className="h-screen flex px-5 md:px-[68px] 1440:px-[204px]">
      {gameMode !== null ? (
        <Game />
      ) :
      (
        <Home /> 
      )}

      <Modal />
    </main>
  )
}

export default App
