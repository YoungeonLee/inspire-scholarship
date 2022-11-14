import { useState } from "react";
import Board from "./components/Board";

export default function App() {
  const [runningCount, setRunningCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  function startAll() {
    setRunningCount((c) => c + 1);
  }
  function pauseAll() {
    setRunningCount(0);
  }
  function resetAll() {
    setResetCount((c) => c + 1);
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "1rem" }}>
        <button onClick={startAll}>Start All</button>
        <button onClick={pauseAll}>Pause All</button>
        <button onClick={resetAll}>Reset All</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <Board
            board={1}
            startingKindness={10}
            runningCount={runningCount}
            resetCount={resetCount}
          />
        </div>
        <div style={{ padding: "1rem" }}>
          <Board
            board={2}
            startingKindness={1}
            runningCount={runningCount}
            resetCount={resetCount}
          />
        </div>
      </div>
    </div>
  );
}
