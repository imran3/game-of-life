export const GameRules = () => {
  return (
    <div className="rules">
      <p>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          <b>R U L E S </b>
        </a>
      </p>
      <p>1. An alive cells survives if it has 2 or 3 alive neighbors.</p>
      <p>2. A dead cell becomes alive when it has exactly 3 alive neighbors.</p>
      <p>
        3. All the other cells die in the next generation. Similarly, all other
        dead cells stay dead.
      </p>
    </div>
  );
};
