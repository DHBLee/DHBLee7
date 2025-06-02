import React from 'react'
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
const Modal = ({open, onClose, img}) => {
  const dialog = useRef()

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
        modal.showModal();
    }

    return () => modal.close();

  }, [open])


  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`${open ? 'grid' : ''} place-items-center fixed w-full inset-0 z-50 m-auto bg-transparent backdrop:bg-black/80`}>
        <div className='inline-grid justify-items-center gap-5  mx-auto self-center-safe'>
            <button onClick={onClose} className='w-max ml-auto TextPreset3Mobile text-white'>
                CLOSE
            </button>
            <img src={img} alt="Currentartwork Image" className='object-contain ' />
        </div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal