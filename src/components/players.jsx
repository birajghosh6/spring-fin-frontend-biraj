
import React from 'react';
import './players.css';

const Players = ({players}) => {

  const renderPlayer = (player, idx) => {
    // console.log(player);
    return (
    <div className='player-row' key={player.id} id={player.id}>
      <div className='player-row-item delete-player-btn'><button>X</button></div>
      <div className='player-row-item player-name'><span>{player.name}</span></div>
      <div className='player-row-item increase-player-point'><button>+</button></div>
      <div className='player-row-item decrease-player-point'><button>-</button></div>
      <div className='player-row-item player-points'><span>{player.points} points</span></div>
    </div>
    );
  }
  
  return (
    <div className='player-entries'>
      {players.map((player) => renderPlayer(player))}
    </div>
  );
}

export default Players;

