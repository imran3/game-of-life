import { Cell, CellStatus } from '../models/cell';
import { rows, cols } from '../models/constants';

export class GameEngine {
  gridState: Cell[][];
  setGridState;

  constructor(gridState, setGridState) {
    this.gridState = gridState;
    this.setGridState = setGridState;
  }

  resetGrid = () => {
    const newGrid = this.newGrid();
    this.setGridState(newGrid);
  };

  newGrid = () => {
    let grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          status: CellStatus.DEAD,
          x: i,
          y: j,
        };
      }
    }

    return grid;
  };

  computeNextGeneration = () => {
    let nextGenStatus = [];

    for (let x = 0; x < rows; x++) {
      nextGenStatus[x] = [];
      for (let y = 0; y < cols; y++) {
        const cellStatus = this.gridState[x][y].status;
        const neighboursCount = this.countCellNeighbours(x, y);

        if (cellStatus === CellStatus.ALIVE) {
          if (neighboursCount === 2 || neighboursCount === 3) {
            nextGenStatus[x][y] = CellStatus.ALIVE;
          } else {
            nextGenStatus[x][y] = CellStatus.DEAD;
          }
        } else {
          if (neighboursCount === 3) {
            nextGenStatus[x][y] = CellStatus.ALIVE;
          } else {
            nextGenStatus[x][y] = CellStatus.DEAD;
          }
        }
      }
    }

    let newGridState = [...this.gridState];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        newGridState[x][y].status = nextGenStatus[x][y];
      }
    }

    this.setGridState(newGridState);

    return newGridState;
  };

  countCellNeighbours = (cx: number, cy: number) => {
    const neighborsMap = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let count = 0;

    neighborsMap.forEach(([x, y]) => {
      let neighborgX = cx + x;
      let neighborgY = cy + y;

      // remap coordinates if fall outside grid
      if (neighborgX < 0) neighborgX = rows - 1;
      if (neighborgX >= rows) neighborgX = 0;
      if (neighborgY < 0) neighborgY = cols - 1;
      if (neighborgY >= cols) neighborgY = 0;

      if (this.gridState[neighborgX][neighborgY].status === CellStatus.ALIVE)
        count++;
    });
    return count;
  };

  setCellStatus = (x: number, y: number, newCellState: CellStatus) => {
    let newGridState = [...this.gridState];
    newGridState[x][y].status = newCellState;
    this.setGridState(newGridState);
  };

  setRandomGridState = async () => {
    let randomGrid: Cell[][] = this.newGrid();

    let aliveCellsNum = 25;
    let i = 0;

    do {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * rows);
      const cellStatus = randomGrid[x][y].status;

      if (cellStatus === CellStatus.DEAD) {
        randomGrid[x][y].status = CellStatus.ALIVE;
      }

      i++;
    } while (i < aliveCellsNum);

    this.setGridState(randomGrid);
  };

  toggleCellStatus = (x: any, y: any) => {
    const newStatus =
      this.gridState[x][y].status === CellStatus.ALIVE
        ? CellStatus.DEAD
        : CellStatus.ALIVE;

    this.setCellStatus(x, y, newStatus);
  };
}
