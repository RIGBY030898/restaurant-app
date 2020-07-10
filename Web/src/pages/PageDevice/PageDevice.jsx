import React, { Component, Fragment } from 'react'

import { authentification, nameDevice } from '../../common'
import { Redirect } from 'react-router-dom'

class PageDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        const { type } = this.props
        const auth = authentification(type, nameDevice)
        if (!auth) {
            this.setState({ show: false })
        }
    }

    render() {
        const { logIn } = this.props
        const { show } = this.state

        if (logIn) {
            return (
                <Fragment>
                    {show ? (
                        <Fragment>Bienvenido a Devices</Fragment>
                    ) : (
                        <Redirect to='/404' />
                    )}
                </Fragment>
            )
        } else {
            return <Redirect to='/' />
        }
    }
}

export default PageDevice
