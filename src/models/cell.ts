export enum CellStatus {
  'DEAD',
  'ALIVE',
}

export interface Cell {
  status: CellStatus;
  x: number;
  y: number;
}
