import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import './App.css';
import { Cell, CellStatus } from './models/cell';
import { color_palette } from './models/constants/constants';

const rows = 10;
const cols = 10;

export const App = () => {
  const [gridState, setGridState] = useState(createNewGrid());

  return (
    <Container maxWidth="md" className="App">
      <h1>Game of Life</h1>
      <div className="prettyGridTable">
        {renderPrettyGridTable(gridState, setGridState)}
      </div>
      <div className="controls">
        <Button
          className="btn"
          variant="contained"
          style={{
            borderRadius: 15,
            backgroundColor: color_palette.pale_spring_Bud,
            color: color_palette.terra_cotta,
            fontSize: '18px',
          }}
          onClick={() => computeNextGen(gridState, setGridState)}
        >
          Next gen
        </Button>
        <Button
          className="btn"
          variant="outlined"
          style={{
            borderRadius: 15,
            backgroundColor: color_palette.alabaster,
            fontSize: '18px',
            color: color_palette.terra_cotta,
          }}
          onClick={() => setRandomGridState(gridState, setGridState)}
        >
          Random Gen
        </Button>

        <Button
          className="btn"
          variant="outlined"
          style={{
            borderRadius: 15,
            backgroundColor: color_palette.cadet_blue,
            color: color_palette.opal,
            fontSize: '18px',
          }}
          onClick={() => setGridState(createNewGrid())}
        >
          Reset
        </Button>
      </div>
      <div className="rules">
        <p>
          <b>R U L E S </b>
        </p>
        <p>1. An alive cells survives if it has 2 or 3 alive neighbors.</p>
        <p>
          2. A dead cell becomes alive when it has exactly 3 alive neighbors.
        </p>
        <p>
          3. All the other cells die in the next generation. Similarly, all
          other dead cells stay dead.
        </p>
      </div>
    </Container>
  );
};

const computeNextGen = (gridState: Cell[][], setGridState) => {
  let ng = [];

  for (let x = 0; x < rows; x++) {
    ng[x] = [];
    for (let y = 0; y < cols; y++) {
      const cellStatus = gridState[x][y].status;
      const neighboursCount = countCellNeighbours(gridState, x, y);

      if (cellStatus === CellStatus.ALIVE) {
        if (neighboursCount === 2 || neighboursCount === 3) {
          ng[x][y] = CellStatus.ALIVE;
        } else {
          ng[x][y] = CellStatus.DEAD;
        }
      } else {
        if (neighboursCount === 3) {
          ng[x][y] = CellStatus.ALIVE;
        } else {
          ng[x][y] = CellStatus.DEAD;
        }
      }
    }
  }

  let newGridState = [...gridState];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      newGridState[x][y].status = ng[x][y];
    }
  }

  setGridState(newGridState);
};

const countCellNeighbours = (gridState: Cell[][], cx: number, cy: number) => {
  const neighbors = [
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

  neighbors.forEach(([x, y]) => {
    const newI = cx + x;
    const newJ = cy + y;

    if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
      if (gridState[newI][newJ].status === CellStatus.ALIVE) count++;
    }
  });

  return count;
};

const updateCellStatus = (
  x: number,
  y: number,
  newCellState: CellStatus,
  gridState: Cell[][],
  setGridState
) => {
  let newGridState = [...gridState];
  newGridState[x][y].status = newCellState;
  setGridState(newGridState);
};

const toggleCellStatus = (
  x: any,
  y: any,
  gridState: Cell[][],
  setGridState
) => {
  const newStatus =
    gridState[x][y].status === CellStatus.ALIVE
      ? CellStatus.DEAD
      : CellStatus.ALIVE;

  updateCellStatus(x, y, newStatus, gridState, setGridState);
};

const renderPrettyGridTable = (gridState: Cell[][], setGridState) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {gridState.map((row, rowIndex) => (
            <TableRow className="tableRow" key={rowIndex} sx={{ border: 0 }}>
              {row.map((cell, sIndex) => {
                return (
                  <TableCell
                    key={rowIndex + '-' + sIndex}
                    align="center"
                    padding="normal"
                    size="medium"
                    className="tableCell"
                    onClick={() =>
                      toggleCellStatus(cell.x, cell.y, gridState, setGridState)
                    }
                    style={{
                      background: cell.status
                        ? color_palette.terra_cotta
                        : color_palette.pale_spring_Bud,
                    }}
                  ></TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const createNewGrid = (): Cell[][] => {
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

  console.log('rset grid');
  return grid;
};

const setRandomGridState = async (gridState, setGridState) => {
  setGridState(createNewGrid());

  let aliveCellsNum = 25;
  let i = 0;

  do {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * rows);
    const cellStatus = gridState[x][y].status;

    if (cellStatus === CellStatus.DEAD) {
      updateCellStatus(x, y, CellStatus.ALIVE, gridState, setGridState);
    }

    i++;
  } while (i < aliveCellsNum);
};

export default App;
