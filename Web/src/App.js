import React, { Fragment, Component } from 'react'
import { history } from './service'
import { Switch, Route, Router } from 'react-router-dom'

import {
    PageHome,
    PageNotFound,
    PageLogin,
    PageDevice,
    PageDishe,
    PageOrder,
    PageRegister,
    Page,
} from './pages'
import { Header } from './components'
import {
    urlDevice,
    urlDishe,
    urlOrder,
    urlRegister,
    urlMain,
    urlHome,
    nameHome,
    nameDevice,
    nameDishe,
    nameOrder,
    nameRegister,
    nameMain,
} from './common'

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
                        <Page
                            exact
                            path={urlMain}
                            component={PageLogin}
                            redirect={urlHome}
                            nameAccess={nameMain}
                            setLogIn={this.logInUser}
                        />
                        <Page
                            exact
                            path={urlHome}
                            component={PageHome}
                            redirect={urlMain}
                            nameAccess={nameHome}
                        />
                        <Page
                            exact
                            path={urlDevice}
                            component={PageDevice}
                            redirect={urlMain}
                            nameAccess={nameDevice}
                        />
                        <Page
                            exact
                            path={urlDishe}
                            component={PageDishe}
                            redirect={urlMain}
                            nameAccess={nameDishe}
                        />
                        <Page
                            exact
                            path={urlOrder}
                            component={PageOrder}
                            redirect={urlMain}
                            nameAccess={nameOrder}
                        />
                        <Page
                            exact
                            path={urlRegister}
                            component={PageRegister}
                            redirect={urlMain}
                            nameAccess={nameRegister}
                        />
                        <Route
                            exact
                            path='*'
                            component={(props) => <PageNotFound {...props} />}
                        />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}

export default App
