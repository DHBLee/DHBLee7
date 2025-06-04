import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import checkIcon from '../../assets/images/icon-check.svg';
import Button from "./Button";
import { sessionActions } from "../../store/gameSessionSlice";
import { boardActions } from "../../store/gameBoardSlice";

const Modal = ({ onClose }) => {
  const dialog = useRef();
  const dispatch = useDispatch();
  const rulesIsOpen = useSelector((state) => state.ui.rulesIsOpen);
  const menuIsOpen = useSelector((state) => state.ui.menuIsOpen);

  useEffect(() => {
    const modal = dialog.current;

    if (rulesIsOpen || menuIsOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [rulesIsOpen, menuIsOpen]);

  const closeModal = () => {
      dispatch(uiActions.closeModal())
  }
  const quitGame = () => {
      dispatch(sessionActions.quitGame())
      dispatch(boardActions.resetBoard())
      closeModal();
    } 
  const restartGame = () => {
      dispatch(boardActions.resetBoard())
      closeModal();
  }

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className={`grid place-items-center fixed w-full inset-0 z-50 m-auto bg-transparent overflow-visible  ${menuIsOpen && "backdrop:bg-black/70"} `}
    >
      {rulesIsOpen && (
          <div className="max-w-[calc(480px-20px)] overflow-visible relative px-5 md:px-[34px]  py-[30px] flex flex-col gap-[33px] justify-center border-[3px] border-black shadow-[0px_10px_0px_0px_black] rounded-3xl bg-white">
                <h1 className="HeadingL text-center">RULES</h1>

                <div className="flex flex-col gap-4">
                  <h3 className="HeadingS text-Purple">OBJECTIVE</h3>
                  <p className="Body text-Black">
                    Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).
                  </p>
                </div>

                <div className="flex flex-col gap-4 pb-6">
                  <h3 className="HeadingS text-Purple">HOW TO PLAY</h3>
                  <ol className="list-decimal list-outside pl-4 text-Black marker:text-black marker:pr-4  [--marker-space:0.75rem]">
                    <li className="Body pl-3">
                      Red goes first in the first game.
                    </li>
                    <li className="Body pl-3">
                      Players must alternate turns, and only one disc can be dropped in each turn.
                    </li>
                    <li className="Body pl-3 ">
                      The game ends when there is a 4-in-a-row or a stalemate.
                    </li>
                    <li className="Body pl-3 ">
                      The starter of the previous game goes second on the next game.
                    </li>
                  </ol>
                </div>
                <button onClick={closeModal} aria-label="Done Checking the Rules Action" className="bg-transparent absolute bottom-[-2.5rem] right-[50%] translate-x-[50%]">
                    <img src={checkIcon} alt="Check Icon" />
                </button>
          </div>  
      )}



      {menuIsOpen && (
          <div className="w-full max-w-[480px] overflow-visible relative px-5 md:px-[34px]  py-[30px] flex flex-col gap-[33px] justify-center border-[3px] border-black shadow-[0px_10px_0px_0px_black] rounded-3xl bg-LightPurple">
                <h1 className="HeadingL text-white text-center">PAUSE</h1>
                <Button onClick={closeModal} extraStyles="bg-white text-black text-center">
                    CONTINUE GAME
                </Button>
                <Button onClick={restartGame} extraStyles="bg-white text-black text-center">
                    RESTART
                </Button>
                <Button onClick={quitGame} extraStyles="bg-Pink text-white text-center">
                    QUIT GAME
                </Button>
          </div> 

      )}

    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
