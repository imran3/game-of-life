import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/footer';
import { GameControls } from './components/game-controls';
import { GameRules } from './components/game-rules';
import { Header } from './components/header';
import { PrettyGameGrid } from './components/pretty-game-grid';
import { GameEngine } from './services/game-engine';

export const App = () => {
  const [gridState, setGridState] = useState([]);
  const [autoPlay, setAutoplay] = useState(null);
  const gameEngine = new GameEngine(
    gridState,
    setGridState,
    autoPlay,
    setAutoplay
  );

  // initialize game
  useEffect(() => {
    gameEngine.setRandomGridState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md" className="App">
      <Header></Header>
      <PrettyGameGrid
        gridState={gridState}
        gameEngine={gameEngine}
      ></PrettyGameGrid>
      <GameControls autoPlay={autoPlay} gameEngine={gameEngine}></GameControls>
      <GameRules></GameRules>
      <Footer></Footer>
    </Container>
  );
};

export default App;
