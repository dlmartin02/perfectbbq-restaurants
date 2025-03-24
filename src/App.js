import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>Interactive Counter</h1>
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
        <div className="counter-container">
          <h2>Current Count:</h2>
          <p className={count < 0 ? 'negative' : count > 0 ? 'positive' : 'zero'}>
            {count}
          </p>
          <div className="button-container">
            <button className="decrement" onClick={decrement}>-</button>
            <button className="reset" onClick={reset}>Reset</button>
            <button className="increment" onClick={increment}>+</button>
          </div>
        </div>
        <div className="counter-info">
          {count === 0 && <p>Let's start counting!</p>}
          {count > 0 && <p>Going up! 📈</p>}
          {count < 0 && <p>Going down! 📉</p>}
          {Math.abs(count) > 10 && <p>You're on a roll!</p>}
        </div>
      </header>
    </div>
  );
}

export default App;