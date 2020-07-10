import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { authentification, nameOrder } from '../../common'

class PageOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        const { type } = this.props
        const auth = authentification(type, nameOrder)
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
                        <Fragment>Bienvenido a Orders</Fragment>
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

export default PageOrder
