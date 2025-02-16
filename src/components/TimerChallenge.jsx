import { useState, useRef } from "react";
import ResultModal from "./ResultModal";


export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef(null); // useRef to persist across re-renders
  const dialogRef = useRef(); // showModal

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); // in miliseconds
  const timeInterval = 10; // in every 10sec, decrease targetTime
  const timeIsActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000); // derived state


  if (timeRemaining <= 0){
    clearInterval(timerRef.current); // clear the timer when time is up
    dialogRef.current.open();
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timerRef.current = setInterval(() => {
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining - timeInterval);
    }, timeInterval); // starts timer
  }

  function handleStop() {
    dialogRef.current.open();
    clearInterval(timerRef.current); // Clear the timer with button
  }

  return (
    <>
    <ResultModal ref= {dialogRef} targetTime={targetTime} remaining={timeRemaining} onReset={handleReset}/>
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timeIsActive ? handleStop : handleStart}>
          {timeIsActive ? "Stop" : "Start"}
        </button>
      </p>
      <p className="">
        {timeIsActive ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
    </>
  );
}
