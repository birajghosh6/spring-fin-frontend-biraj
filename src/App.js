import './App.css';
import Players from './components/players';
import PlayerInfo from './components/playerInfo';
import AddPlayer from './components/addPlayer';
import {fetchPlayers} from './utilities/apiHelper';

import React, { useState, useEffect } from 'react';


export default function App() {

  const [players, setPlayers] = useState([]);
  const [showPage, setShowPage] = useState('all-players');
  const [playerToDisplay, setPlayerToDisplay] = useState({});

  useEffect(() => {
    document.title = "Demo Spring Financial";
    fetchPlayers()
    .then(data => {setPlayers(data)});
  }, []);

  const onClickAddPlayer = (e) => {
    setShowPage('add-player');
  }

  const renderSwitch = () => {
    switch (showPage) {
      case 'all-players':
        return (
          <div className='App'>
            <Players 
              players = {players} 
              setPlayers={setPlayers} 
              setShowPage={setShowPage}
              setPlayerToDisplay={setPlayerToDisplay}
            />
            <div className='add-user-button'><button onClick={onClickAddPlayer}>+ Add User</button></div>
        </div>
          
        );
      case 'player-info':
        return (
          <div className='App'>
          <PlayerInfo 
            playerToDisplay={playerToDisplay}
            setShowPage={setShowPage}
          />
          </div>
          
        );
      case 'add-player':
        return (
          <div className='App'>
          <AddPlayer 
            setShowPage={setShowPage}
            setPlayers={setPlayers} 
          />
          </div>
        );
      default:
        return (<div>BAD COMPONENT</div>);
    }
  } 

  return renderSwitch();
}
