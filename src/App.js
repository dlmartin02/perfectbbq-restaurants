// src/App.js
import React, { useState } from 'react';
import Directory from './components/Directory';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
        <h1>My Directory App</h1>
      </header>
      
      <main>
        <Directory />
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} My Directory App</p>
      </footer>
    </div>
  );
}

export default App;