import React from 'react';
import './addPlayer.css';
import { addPlayer } from '../utilities/apiHelper';

const AddPlayer = ({setShowPage,setPlayers,setPlayersToDisplay}) => {

    const getFormInfoDiv = () => document.getElementById('form-info-message');

    const areInputsValid = (name, age, address) => {

        const formInfoDiv = getFormInfoDiv();

        let missingArr = [];
        formInfoDiv.textContent="";

        if (String(name).length === 0) {
            missingArr.push("Name");
        }
        if (String(age).length === 0) {
            missingArr.push("Age");
        }
        if (String(address).length === 0) {
            missingArr.push("Address");
        }

        if (missingArr.length > 0) {
            formInfoDiv.textContent = missingArr.join(', ') + " must be provided";
            formInfoDiv.style.color = "red";
            formInfoDiv.style.visibility = 'visible';

            return false;
        }

        return true;
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        const nameInput = e.currentTarget.elements['player-name-input'];
        const ageInput = e.currentTarget.elements['player-age-input'];
        const addressInput = e.currentTarget.elements['player-address-input'];

        const formInfoDiv = getFormInfoDiv();

        if (!areInputsValid(nameInput.value, ageInput.value, addressInput.value)) {
            return;
        }

        addPlayer(nameInput.value, ageInput.value, addressInput.value)
        .then(data => {
            if (data) {
                setPlayers(data);
                setPlayersToDisplay(data);

                formInfoDiv.textContent = "Player added successfully!";    
                formInfoDiv.style.color = 'green';
                formInfoDiv.style.visibility = 'visible';

                setTimeout(() => {
                    formInfoDiv.style.visibility = 'hidden';
                    formInfoDiv.style.color = 'red';
                    formInfoDiv.textContent = 'Some validation error';
                }, 2000);
            }
        });

        nameInput.value = "";
        ageInput.value = "";
        addressInput.value = "";
    }

    const onClickHome = (e) => {
        setShowPage('all-players');
    }

    const onInputHandler = (e) =>  {
        const formInfoDiv = getFormInfoDiv();
        formInfoDiv.textContent = "Some validation error";
        formInfoDiv.style.visibility = 'hidden';
        formInfoDiv.style.color = "red";
    }
    
    return (
    <div className='add-player-outer-wrapper'>
        
        <form id='add-player-form'onSubmit={onSubmitForm}>
        <div id='go-to-players'><button type='button' onClick={onClickHome}>Home</button></div>
        <legend>Add Player Information</legend>
        <fieldset className='input-fieldset'>
            {/* <legend>Player Name</legend> */}
            <label htmlFor='player-name-input'>Name</label>
            <input name='Name' id='player-name-input' type='text' placeholder='Enter your name' onInput={onInputHandler}></input>
        </fieldset>
        <fieldset className='input-fieldset'>
            {/* <legend>Player Age</legend> */}
            <label htmlFor='player-age-input'>Age</label>
            <input name='Age' id='player-age-input' type='number' placeholder='Enter your age' onInput={onInputHandler}></input>
        </fieldset>
        <fieldset className='input-fieldset'>
            {/* <legend>Address</legend> */}
            <label htmlFor='player-address-input'>Address</label>
            <input name='Address' id='player-address-input' type='text' placeholder='Enter your address' onInput={onInputHandler}></input>
        </fieldset>
        <fieldset className='submit-fieldset'>
            <button type='submit'>Submit</button>
        </fieldset>
        <div id='form-info-message'>Some validation error</div>
        </form>
    </div>
    )
}

export default AddPlayer;
