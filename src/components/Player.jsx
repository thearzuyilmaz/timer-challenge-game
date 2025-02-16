import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  const [enteredName, setEnteredName] = useState();
  const playerName = useRef();

  function handleClick() {
    setEnteredName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? "unknow entity"}</h2>

      <p>
        <input
          ref={playerName} // connecting the ref element
          type="text"
          placeholder="Enter your name"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
