import './App.css';
import Players from './components/players';
import PlayerInfo from './components/playerInfo';
import AddPlayer from './components/addPlayer';
import {fetchPlayers} from './utilities/apiHelper';

import React, { useState, useEffect } from 'react';


export default function App() {

  const [players, setPlayers] = useState([]);
  const [playersToDisplay, setPlayersToDisplay] = useState([]);
  const [showPage, setShowPage] = useState('all-players');
  const [playerToDisplay, setPlayerToDisplay] = useState({});

  useEffect(() => {
    document.title = "Demo Spring Financial";
    fetchPlayers()
    .then(data => {setPlayers(data); setPlayersToDisplay(data);});
  }, []);

  const onClickAddPlayer = (e) => {
    setShowPage('add-player');
  }

  const getSearchPlayerInput = () => document.getElementById('player-search-input');

  const filterPlayersToRender = (player) => {
    const searchPlayerInput = getSearchPlayerInput();
    if (! searchPlayerInput.value) {
      // empty search string
      return true;
    }
    else {
      return player['name'].includes(searchPlayerInput.value);
    }
  }

  const filterPlayersOnInput = (e) => {
    setPlayersToDisplay(players.filter(filterPlayersToRender));
  }

  const renderSwitch = () => {
    switch (showPage) {
      case 'all-players':
        return (
          <div className='App'>
            <div className='player-search'>
              <label htmlFor='player-search-input'>Search Player:</label>
              <input id='player-search-input' type='text' onInput={filterPlayersOnInput}></input>
            </div>
            <Players 
              setPlayers={setPlayers} 
              playersToDisplay={playersToDisplay}
              setPlayersToDisplay={setPlayersToDisplay}
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
            setPlayersToDisplay={setPlayersToDisplay}
          />
          </div>
        );
      default:
        return (<div>BAD COMPONENT</div>);
    }
  } 

  return renderSwitch();
}
