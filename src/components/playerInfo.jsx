import React from 'react';
import './playerInfo.css';

const PlayerInfo = ({playerToDisplay, setShowPage}) => {


  const onClickClosePlayerInfo = (e) => {
    setShowPage('all-players');
  }
  
  
  return (
    <div className='player-info-wrapper'>
        <div className='close-player-info'><button onClick={onClickClosePlayerInfo}>X</button></div>
        <div key={playerToDisplay['id']} className='player-info'>
          
          <div className='player-info-row'>
            <span className='player-info-row-label'>Name</span>
            <span className='player-info-row-equals'>=&gt;</span>
            <span className='player-info-row-value'>{playerToDisplay['name']}</span>
          </div>
          <div className='player-info-row'>
            <span className='player-info-row-label'>Age</span>
            <span className='player-info-row-equals'>=&gt;</span>
            <span className='player-info-row-value'>{playerToDisplay['age']}</span>
          </div>
          <div className='player-info-row'>
            <span className='player-info-row-label'>Points</span>
            <span className='player-info-row-equals'>=&gt;</span>
            <span className='player-info-row-value'>{playerToDisplay['points']}</span>
          </div>
          <div className='player-info-row'>
            <span className='player-info-row-label'>Address</span>
            <span className='player-info-row-equals'>=&gt;</span>
            <span className='player-info-row-value'>{playerToDisplay['points']}</span>
          </div>
        </div>
    </div>
  )
}

export default PlayerInfo;
