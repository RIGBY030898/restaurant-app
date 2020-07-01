import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {firebaseDatabaseReference as database} from './config'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      devices: []
    }
  }

  componentWillMount() {
    database.child('Devices').on('value', snapshot => {
      const data = Object.values(snapshot.val())
      this.setState({
        devices: data
      })
    })
  }

  render() {
    const { devices } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Existen {devices.length} dispositivos registrados en la BD.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            react
          </a>
        </header>
      </div>
    );
  }
}

export default App;
