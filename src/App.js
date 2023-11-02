import './App.css';
import './components/players';
// import fetchPlayers from './utilities/apiHelper';
import {fetchPlayers} from './utilities/apiHelper';

import React, { useState, useEffect } from 'react';
import Players from './components/players';

export default function App() {

  const [players, setPlayers] = useState([]);
  const [showPage, setShowPage] = useState('all-players');

  useEffect(() => {
    document.title = "Demo Spring Financial";
    fetchPlayers()
    .then(data => {setPlayers(data)});
  }, []);

  return (
    <div className='App'>
      <Players players = {players} setPlayers={setPlayers}/>
    </div>
  );
}
