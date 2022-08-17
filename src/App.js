import React from 'react';
import './App.css';
import TableContext from './context/TableContext';
import Starwars from './Starwars';

function App() {
  const contextValue = 'Hello';
  return (
    <TableContext.Provider value={ contextValue }>
      <Starwars />
    </TableContext.Provider>
  );
}

export default App;
