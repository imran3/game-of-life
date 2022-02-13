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
import { useEffect, useState } from 'react';
import './App.css';
import { Cell } from './models/cell';
import { color_palette } from './models/constants';
import { GameEngine } from './services/game-engine';

export const App = () => {
  const [gridState, setGridState] = useState([]);

  const gameEngine = new GameEngine(gridState, setGridState);

  // initialize game
  useEffect(() => {
    gameEngine.setRandomGridState();
  }, []);

  return (
    <Container maxWidth="md" className="App">
      <h1>Game of Life</h1>
      <div className="prettyGridTable">
        {renderPrettyGridTable(gridState, gameEngine)}
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
          onClick={() => gameEngine.computeNextGeneration()}
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
          onClick={() => gameEngine.setRandomGridState()}
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
          onClick={() => gameEngine.resetGrid()}
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

const renderPrettyGridTable = (gridState: Cell[][], gameEngine) => {
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
                    onClick={() => gameEngine.toggleCellStatus(cell.x, cell.y)}
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

export default App;
