import React from 'react';
import './App.css';
import { Cards } from './features/game/Cards';
import { Controls } from './features/game/Controls';
import { Table } from './features/game/Table';

function App() {
  return (
    <div className="App">
      <Cards />
      <Controls />
      <Table />
    </div>
  );
}

export default App;
