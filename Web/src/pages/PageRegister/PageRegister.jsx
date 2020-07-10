import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { authentification, nameRegister } from '../../common'

import { FormRegister } from './components'

class PageRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        const { type } = this.props
        const auth = authentification(type, nameRegister)
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
                        <FormRegister title='Registro de usuario' />
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

export default PageRegister
