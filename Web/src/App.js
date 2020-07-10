import React, { Fragment, Component } from 'react'
import { history } from './service'
import { Switch, Route, Router, Redirect } from 'react-router-dom'

import {
    PageHome,
    PageNotFound,
    PageLogin,
    PageDevice,
    PageDishe,
    PageOrder,
    PageRegister,
} from './pages'
import { Header } from './components'
import { urlDevice, urlDishe, urlOrder, urlRegister, urlMain, urlHome } from './common'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logIn: false,
            user: {},
        }
    }

    componentDidMount() {
        const localType = localStorage.getItem('type')
        if (localType !== null) {
            const localUser = localStorage.getItem('user')
            this.setState({
                logIn: true,
                user: { username: localUser, type: localType },
            })
        }
    }

    logInUser = (user) => {
        const { type, username } = user
        localStorage.setItem('user', username)
        localStorage.setItem('type', type)
        this.setState({
            user: user,
            logIn: true,
        })
    }

    logOutUser = () => {
        const localPassword = localStorage.getItem('password')
        if (localPassword === null) {
            localStorage.removeItem('user')
        }
        localStorage.removeItem('type')
        history.push('/')
        this.setState({
            logIn: false,
            user: {},
        })
    }

    render() {
        const {
            logIn,
            user: { username, type },
        } = this.state

        return (
            <Fragment>
                <Router history={history}>
                    {logIn ? (
                        <Header username={username} type={type} exit={this.logOutUser} />
                    ) : (
                        <Fragment></Fragment>
                    )}
                    <Switch>
                        <Route
                            exact
                            path={urlMain}
                            component={(props) => (
                                <PageLogin
                                    {...props}
                                    setLogIn={this.logInUser}
                                    logIn={logIn}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={urlHome}
                            component={(props) => (
                                <PageHome {...props} user={username} logIn={logIn} />
                            )}
                        />
                        <Route
                            exact
                            path={urlDevice}
                            component={(props) => (
                                <PageDevice {...props} logIn={logIn} type={type} />
                            )}
                        />
                        <Route
                            exact
                            path={urlDishe}
                            component={(props) => (
                                <PageDishe {...props} logIn={logIn} type={type} />
                            )}
                        />
                        <Route
                            exact
                            path={urlOrder}
                            component={(props) => (
                                <PageOrder {...props} logIn={logIn} type={type} />
                            )}
                        />
                        <Route
                            exact
                            path={urlRegister}
                            component={(props) => (
                                <PageRegister {...props} logIn={logIn} type={type} />
                            )}
                        />
                        <Route
                            exact
                            path='/404'
                            component={(props) => <PageNotFound {...props} />}
                        />
                        <Redirect to='/404' />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}

export default App
