import './App.css';
import './components/players';
import {HEADERS} from './utilities/util';

import React, { useState, useEffect } from 'react';
import Players from './components/players';

export default function App() {

  const [players, setPlayers] = useState([]);
  const [showAddPlayer,setShowAddPlayer] = useState(false);

  useEffect(() => {
    document.title = "Demo Spring Financial";
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/players`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(data => {
      setPlayers(data['Players']);
    });
  }

  return (
    <div className='App'>
      <Players players = {players}/>
    </div>
  );
}




// export default class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       players: [],
//       isLoaded: false
//     }
//   }

//   componentDidMount() {
    
//     fetch(`${process.env.REACT_APP_BACKEND_API_URL}/players`, {
//       method: 'GET',
//       headers: {
//         'X-API-Key': process.env.REACT_APP_SPRING_API_KEY,
//         'Access-Control-Allow-Origin': 'http://localhost:3000'
//       }
//     })
//     .then(res => res.json())
//     .then(data => {
//       this.setState({
//         isLoaded: true,
//         players: data['Players']
//       });
//     });
    
//   }
  
//   render() {
//     return (
//       <div>
//           Length: {this.state.players.length}
//       </div>
//     )
//   }
// }
