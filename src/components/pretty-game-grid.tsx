import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

import { color_palette } from '../models/constants';

export const PrettyGameGrid = ({ gridState, gameEngine }) => {
  return (
    <div className="prettyGridTable">
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
                        gameEngine.toggleCellStatus(cell.x, cell.y)
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
    </div>
  );
};
