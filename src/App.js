import React from 'react';
import './App.css';
import Starwars from './component/Starwars';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <div>
      <AppProvider>
        <Starwars />
      </AppProvider>
    </div>
  );
}

export default App;
