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
  x: number;
  y: number;
  status: string;
}

let grid: Cell[][];
const rows = 5;
const cols = 5;

export const App = () => {
  const [gridState, setGridState] = useState(createNewGrid());

  return (
    <div className="App">
      <div className="mui-container">
        <h1>Game of Life</h1>
      </div>

      <div className="hello">{renderPrettyGridTable(gridState)}</div>
      <div className="gridTable">{renderGridTable(gridState)}</div>

      <Button onClick={() => changeStatus(gridState, setGridState)}>
        Change cell status
      </Button>
    </div>
  );
};

const changeStatus = (gridState, setGridState) => {
  let r = Math.floor(Math.random() * rows);
  let c = Math.floor(Math.random() * cols);

  let newGridState = [...gridState];
  newGridState[r][c].status = '1';
  setGridState(newGridState);

  console.log('state after:', gridState);
};

const renderPrettyGridTable = gridState => {
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
                    style={{ width: '5%' }}
                    padding="normal"
                    size="medium"
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

function renderGridTable(gridState) {
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
  grid = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = { x: i, y: j, status: '0' };
    }
  }

  return grid;
};

const printGrid = () => {
  let gridString = '';
  for (let i = 0; i < rows; i++) {
    gridString += '\nROW: ' + i + '  ';
    for (let j = 0; j < cols; j++) {
      gridString += grid[i][j].status + ' ';
    }

    console.log(gridString);
  }
};

export default App;
