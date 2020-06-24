import React, { useState, useEffect } from 'react'
import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import { history } from './service'
import { Home } from './page/Home'
import { PageNotFound } from './page/NotFound'
import { Login } from './page/Login'
import Register from './page/Register'
// import { firebaseDatabaseReference as database } from './config';

const App = () => {
    const [user, setUser] = useState('')
    const [typeUser, setTypeUser] = useState('admin')

    useEffect(() => {
        if (user === '') {
            const userStorage = localStorage.getItem('user')
            if (userStorage !== null) {
                setUser(userStorage)
                setTypeUser(localStorage.getItem('typeUser'))
            }
        }
    })

    const handleChangeUser = (u) => {
        setUser(u)
    }

    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={(props) => (
                        <Login
                            {...props}
                            user={user}
                            typeUser={typeUser}
                            handleUser={handleChangeUser}
                        />
                    )}
                />
                <Route
                    exact
                    path='/home'
                    component={(props) => (
                        <Home {...props} user={user} handleUser={handleChangeUser} />
                    )}
                />
                <Route
                    exact
                    path='/register'
                    component={(props) => <Register {...props} typeUser={typeUser} />}
                />

                <Route exact path='/404' component={PageNotFound} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}
/*
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        };
    }

    componentWillMount() {
        database.child('Devices').on('value', (snapshot) => {
            const data = Object.values(snapshot.val());
            this.setState({
                devices: data,
            });
        });
    }

    render() {
        const { devices } = this.state;
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Existen {devices.length} dispositivos registrados en la
                        BD.
                    </p>
                    <a
                        className='App-link'
                        href='https://reactjs.org'
                        target='_blank'
                        rel='noopener noreferrer'>
                        react
                    </a>
                </header>
            </div>
        );
    }
}
*/
export default App
