import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ ref, targetTime, remaining, onReset }) {

    const isUserLost = remaining <= 0;
    const formattedRemaining = (remaining/1000).toFixed(2);
    const score = Math.round((1 - remaining / (targetTime * 1000)) * 100);

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {

            open(){
                dialog.current.showModal();

            }
        }
    })
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {isUserLost && <h2>You lost</h2>}
      {!isUserLost && <h2>Your score is {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemaining} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
