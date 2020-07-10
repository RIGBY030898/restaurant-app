import React, { Component } from 'react'

import { FormRegister } from './components'

class PageRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <FormRegister title='Registro de usuario' />
    }
}

export default PageRegister
