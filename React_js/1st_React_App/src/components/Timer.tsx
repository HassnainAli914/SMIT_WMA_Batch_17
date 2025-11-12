import {  useState } from "react";

export default function TimerControl() {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const start = () => {
    if (intervalId) return;

    const id = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    setIntervalId(id);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
