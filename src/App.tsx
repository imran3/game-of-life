import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import './App.css';

export enum CellStatus {
  'DEAD',
  'ALIVE',
}
export interface Cell {
  status: CellStatus;
}

const rows = 6;
const cols = 6;

export const App = () => {
  const [gridState, setGridState] = useState(createNewGrid());

  return (
    <div className="App">
      <div className="mui-container">
        <h1>Game of Life</h1>
      </div>

      <div className="prettyGridTable">{renderPrettyGridTable(gridState)}</div>
      <div className="gridTable">{renderGridTable(gridState)}</div>

      <Button
        variant="contained"
        color="success"
        onClick={() => setGridState(createNewGrid())}
      >
        New Grid
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => computeNextGen(gridState, setGridState)}
      >
        Next gen
      </Button>
    </div>
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

const renderPrettyGridTable = (gridState: Cell[][]) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: '500px' }}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {gridState.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, sIndex) => {
                return (
                  <TableCell
                    key={rowIndex + '-' + sIndex}
                    align="center"
                    padding="normal"
                    size="medium"
                    style={{ background: cell.status ? 'green' : 'red' }}
                  >
                    {cell.status}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function renderGridTable(gridState: Cell[][]) {
  return (
    <table>
      <tbody>
        {gridState.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, sIndex) => {
                return <td key={index + '-' + sIndex}> {cell.status} </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const createNewGrid = () => {
  let grid = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = {
        status: CellStatus.DEAD,
      };
    }
  }

  grid[1][1].status = CellStatus.ALIVE;
  grid[1][2].status = CellStatus.ALIVE;
  grid[2][1].status = CellStatus.ALIVE;
  grid[2][2].status = CellStatus.ALIVE;

  grid[3][3].status = CellStatus.ALIVE;
  grid[3][4].status = CellStatus.ALIVE;
  grid[4][3].status = CellStatus.ALIVE;
  grid[4][4].status = CellStatus.ALIVE;

  return grid;
};

export default App;
