import Game from "./components/Game"
import { useSelector } from 'react-redux';
import Home from "./components/Home";
import Modal from "./components/UI/Modal";
import TurnIndicator from "./components/TurnIndicator";

function App() {
  const gameMode = useSelector((state) => state.session?.gameMode);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex px-5 md:px-[68px] 1440:px-[204px]">
        {gameMode !== null ? (
          <Game />
        ) : (
          <Home /> 
        )}
        <Modal />
      </main>
      {gameMode !== null && <TurnIndicator />}
    </div>
  )
}

export default App