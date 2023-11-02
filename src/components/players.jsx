
import React from 'react';
import './players.css';
import {fetchPlayers, deletePlayer, incrementPlayerPoint, decrementPlayerPoint} from '../utilities/apiHelper';

const Players = ({players, setPlayers, setShowPage, setPlayerToDisplay}) => {

  const getNameSortDirectionTag = () => document.getElementById('name-sort').children[0];
  const getPointsSortDirectionTag = () => document.getElementById('points-sort').children[0];
  const getPlayerRowContainerFromButtons = (e) => e.currentTarget.parentElement.parentElement;

  const onClickSorters = (e) => {
    const otherSortDiv = document.getElementById(e.currentTarget.id === 'points-sort'?'name-sort':'points-sort');
    const otherSortDivSortDirectionTag = otherSortDiv.children[0];
    otherSortDivSortDirectionTag.style.visibility = 'hidden';

    const sortDirectionTag = e.currentTarget.children[0];
    sortDirectionTag.style.visibility = 'visible';
    let sortItem = e.currentTarget.children[1].getAttribute('name');
    let order;

    if (sortDirectionTag.textContent === 'v') { // reverse the current order
      order = 'ASC';
      sortDirectionTag.textContent = '^';
    }
    else {
      order = 'DESC';
      sortDirectionTag.textContent = 'v';
    }
    fetchPlayers(sortItem, order)
    .then(data => {setPlayers(data)});
  }

  const onClickDeletePlayer = (e) => {
    const playerDivContainer = getPlayerRowContainerFromButtons(e);
    deletePlayer(playerDivContainer.id)
    .then(data => {setPlayers(data)});

    getNameSortDirectionTag().style.visibility = 'hidden';
    getPointsSortDirectionTag().style.visibility = 'visible';
    getPointsSortDirectionTag().textContent = 'v';
  }

  const onClickUpdatePoint = (e) => {
    const playerDivContainer = getPlayerRowContainerFromButtons(e);

    if (e.currentTarget.textContent === '+') {
      incrementPlayerPoint(playerDivContainer.id)
      .then(data => {
        if (data) {
          setPlayers(data);
        }
      });
    }
    else if(e.currentTarget.textContent === '-') {
      decrementPlayerPoint(playerDivContainer.id)
      .then(data => {
        if (data) {
          setPlayers(data);
        }
      });
    }
    
  }

  const onClickShowPlayerInfo = (e) => {
    const playerRowContainer = e.currentTarget.parentElement;
    let playerToDisplay = players.find(player => Number(player['id']) === Number(playerRowContainer.id));
    setPlayerToDisplay(playerToDisplay);
    setShowPage('player-info');
  }

  const renderPlayer = (player, idx) => {
    return (
    <div className='player-row' key={player.id} id={player.id}>
      <div className='player-row-item delete-player-btn'><button onClick={onClickDeletePlayer}>X</button></div>
      <div className='player-row-item player-name api-data' onClick={onClickShowPlayerInfo}><span>{player.name}</span></div>
      <div className='player-row-item increase-player-point'><button onClick={onClickUpdatePoint}>+</button></div>
      <div className='player-row-item decrease-player-point'><button onClick={onClickUpdatePoint}>-</button></div>
      <div className='player-row-item player-points api-data'><span>{player.points} points</span></div>
    </div>
    );
  }
  
  return (
    <div className='player-entries'>
      <div className='player-row'>
        <div className='player-row-item delete-player-btn'></div>
        <div id='name-sort' className='player-row-item player-name' onClick={onClickSorters}>
          <span className='sort-direction'>v</span>
          &nbsp;
          <span name='name'>NAME</span>
        </div>
        <div className='player-row-item increase-player-point'></div>
        <div className='player-row-item decrease-player-point'></div>
        <div id='points-sort' className='player-row-item player-points' onClick={onClickSorters}>
          <span className='sort-direction'>v</span>
          &nbsp;
          <span name='points'>POINTS</span>
        </div>
      </div>
      {players.map((player) => renderPlayer(player))}
    </div>
  );
}

export default Players;

