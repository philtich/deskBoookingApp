import  { FunctionComponent, useEffect } from "react";
import FocusLock from "react-focus-lock";
import ReactDOM from "react-dom";
import { ModalProps } from "../../../Types/types";



export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && isShown) {
      hide();
    }
  };

  useEffect(() => {
    isShown
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [isShown]);

  const modal = (
    <>
      <div onClick={hide} className="fixed w-full h-full top-0 left-0 z-[500] opacity-80 bg-darkGray"></div>
      <FocusLock>
        <div 
          aria-modal
          tabIndex={-1}
          role="dialog"
          className="z-[700] fixed outline-none w-1/2 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
        >
          <div className="bg-offWhite p-4 flex justify-center items-center">
            <div>
              <p>{headerText}</p>
            </div>
            <div>{modalContent}</div>
          </div>
        </div>
      </FocusLock>
    </>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
