import { Button } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Game of Life</h1>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
    </div>
  );
}

export default App;
