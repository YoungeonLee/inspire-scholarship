import React, { useEffect, useState } from "react";
import {
  boardData1,
  resetBoard1,
  updateBoard1,
  boardData2,
  resetBoard2,
  updateBoard2,
  Cell,
} from "./data";
import { GrUserWorker, GrTools } from "react-icons/gr";
import { GiDeathSkull, GiHealthNormal } from "react-icons/gi";

type State = "Working" | "Resting" | "Healing";

interface Person {
  id: number;
  kindness: number;
  health: number;
  state: State;
}

const MAX_HEALTH = 10;

function makePeople(kindness: number): Person[] {
  const people: Person[] = [];
  for (let i = 0; i < 8; i++) {
    people.push({ id: i, kindness, health: MAX_HEALTH, state: "Resting" });
  }
  return people;
}

function healablePerson(person: Person | undefined) {
  if (!person) {
    return false;
  }
  if (person.health !== 0 && person.health < MAX_HEALTH) {
    return true;
  } else {
    return false;
  }
}

export default function Board({
  board,
  startingKindness,
  runningCount,
  resetCount,
}: {
  board: number;
  startingKindness: number;
  runningCount: number;
  resetCount: number;
}) {
  let updateBoard: Function;
  let resetBoard: Function;
  let boardData: Cell[][];
  if (board === 1) {
    updateBoard = updateBoard1;
    resetBoard = resetBoard1;
    boardData = boardData1;
  } else {
    updateBoard = updateBoard2;
    resetBoard = resetBoard2;
    boardData = boardData2;
  }
  const [count, setCount] = useState(0);
  const [kindness, setKindness] = useState(startingKindness);
  useEffect(() => {
    reset();
  }, [kindness]);

  const [people, setPeople] = useState<Person[]>(makePeople(kindness));
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (runningCount > 0) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [runningCount]);

  useEffect(() => {
    let timeout: number;
    let newPeople = [...people];
    if (running) {
      newPeople = newPeople.map((person) => {
        const newPerson = { ...person };
        newPerson.state = "Resting";
        if (newPerson.health > 0) {
          const chance = 10 * Math.random();
          if (newPerson.kindness > chance) {
            const healChance = 10 * Math.random() * 2;
            const leftPerson = newPeople[newPerson.id - 1];
            const rightPerson = newPeople[newPerson.id + 1];
            const healable =
              healablePerson(leftPerson) || healablePerson(rightPerson);
            if (healable && newPerson.kindness > healChance) {
              newPerson.state = "Healing";
            } else {
              newPerson.state = "Working";
            }
          }
        }
        return newPerson;
      });
      setPeople(newPeople);

      timeout = setTimeout(() => {
        for (let i = 0; i < newPeople.length; i++) {
          const person = newPeople[i];
          if (person.state === "Healing") {
            const leftPerson = newPeople[i - 1];
            const rightPerson = newPeople[i + 1];
            if (healablePerson(leftPerson)) {
              leftPerson.health += 1;
            }
            if (healablePerson(rightPerson)) {
              rightPerson.health += 1;
            }
          } else if (person.state === "Working") {
            person.health -= 1;
            const success = updateBoard();
            if (!success) {
              setRunning(false);
              break;
            }
          }
        }
        setPeople(newPeople);
        setCount((v) => v + 1);
      }, 100);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [running, count]);

  function simulate() {
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    setPeople(makePeople(kindness));
    resetBoard();
    setCount((v) => v + 1);
  }
  useEffect(() => {
    reset();
  }, [resetCount]);

  return (
    <>
      <input
        type="range"
        max={10}
        min={1}
        value={kindness}
        onChange={(e) => setKindness(Number(e.target.value))}
      />
      <div>Kindness: {kindness}</div>
      <button onClick={simulate}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={reset}>Reset</button>
      <div
        className="col"
        style={{
          width: "32rem",
          height: "32rem",
          border: "1px solid black",
        }}
      >
        {boardData.map((row, i) => (
          <div key={i} className="row flex-1">
            {row.map((cell) => (
              <div
                className="cell"
                key={`${cell.row}-${cell.col}`}
                style={{
                  backgroundColor: cell.color,
                }}
              ></div>
            ))}
          </div>
        ))}
        <div className="row">
          {people.map((person) => (
            <div
              key={person.id}
              className="cell row"
              style={{ aspectRatio: 1, position: "relative" }}
            >
              <PersonHealth person={person} />
              <PersonState person={person} />
              <PersonTool person={person} running={running} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PersonHealth({ person }: { person: Person }) {
  return (
    <div
      className="col"
      style={{
        backgroundColor: "red",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <div
        style={{ flex: MAX_HEALTH - person.health, backgroundColor: "white" }}
      ></div>
      <div style={{ flex: person.health, backgroundColor: "green" }}></div>
    </div>
  );
}

function PersonState({ person }: { person: Person }) {
  return (
    <div className="flex-1" style={{ width: "100%", height: "100%" }}>
      {person.health <= 0 ? (
        <GiDeathSkull
          className="flex-1"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <GrUserWorker
          className="flex-1"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}

function PersonTool({ person, running }: { person: Person; running: boolean }) {
  return (
    <div className="flex-1" style={{ width: "100%", height: "100%" }}>
      {person.state === "Working" ? (
        <GrTools
          className={running ? "rotate" : ""}
          style={{ width: "100%", height: "100%" }}
        />
      ) : person.state === "Healing" ? (
        <GiHealthNormal
          className={running ? "zoom" : ""}
          style={{ width: "100%", height: "100%" }}
        />
      ) : null}
    </div>
  );
}
