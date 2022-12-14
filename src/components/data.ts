export interface Cell {
  row: number;
  col: number;
  color: string;
}

const size = 16;
export const boardData1: Cell[][] = [];
for (let i = 0; i < size; i++) {
  const row: Cell[] = [];
  for (let j = 0; j < size; j++) {
    row.push({ row: i, col: j, color: "white" });
  }
  boardData1.push(row);
}

export const boardData2: Cell[][] = [];
for (let i = 0; i < size; i++) {
  const row: Cell[] = [];
  for (let j = 0; j < size; j++) {
    row.push({ row: i, col: j, color: "white" });
  }
  boardData2.push(row);
}

export function updateBoard1() {
  if (progress1 >= order.length) {
    return false;
  }
  const [row, col] = order[progress1];
  boardData1[row][col].color = "red";
  progress1 += 1;
  return true;
}

export function updateBoard2() {
  if (progress2 >= order.length) {
    return false;
  }
  const [row, col] = order[progress2];
  boardData2[row][col].color = "red";
  progress2 += 1;
  return true;
}

export function resetBoard1() {
  for (let i = 0; i < boardData1.length; i++) {
    for (let j = 0; j < boardData1[0].length; j++) {
      boardData1[i][j].color = "white";
    }
  }
  progress1 = 0;
}

export function resetBoard2() {
  for (let i = 0; i < boardData2.length; i++) {
    for (let j = 0; j < boardData2[0].length; j++) {
      boardData2[i][j].color = "white";
    }
  }
  progress2 = 0;
}

let progress1 = 0;
let progress2 = 0;
const order = [
  [14, 4],
  [14, 5],
  [14, 6],
  [14, 7],
  [14, 8],
  [14, 9],
  [14, 10],
  [14, 11],
  [13, 3],
  [13, 4],
  [13, 5],
  [13, 6],
  [13, 7],
  [13, 8],
  [13, 9],
  [13, 10],
  [13, 11],
  [13, 12],
  [12, 2],
  [12, 3],
  [12, 4],
  [12, 5],
  [12, 6],
  [12, 7],
  [12, 8],
  [12, 9],
  [12, 10],
  [12, 11],
  [12, 12],
  [12, 13],
  [11, 2],
  [11, 3],
  [11, 4],
  [11, 5],
  [11, 6],
  [11, 7],
  [11, 8],
  [11, 9],
  [11, 10],
  [11, 11],
  [11, 12],
  [11, 13],
  [10, 2],
  [10, 3],
  [10, 4],
  [10, 5],
  [10, 10],
  [10, 11],
  [10, 12],
  [10, 13],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
  [9, 10],
  [9, 11],
  [9, 12],
  [9, 13],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [8, 10],
  [8, 11],
  [8, 12],
  [8, 13],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [7, 10],
  [7, 11],
  [7, 12],
  [7, 13],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 10],
  [6, 11],
  [6, 12],
  [6, 13],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [5, 10],
  [5, 11],
  [5, 12],
  [5, 13],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 9],
  [4, 10],
  [4, 11],
  [4, 12],
  [4, 13],
  [4, 14],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [3, 9],
  [3, 10],
  [3, 11],
  [3, 12],
  [3, 13],
  [3, 14],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 9],
  [2, 10],
  [2, 11],
  [2, 12],
  [2, 13],
  [2, 14],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 9],
  [1, 10],
  [1, 11],
  [1, 12],
  [1, 13],
  [1, 14],
];
