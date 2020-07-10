import React, { Component, Fragment } from 'react'

import { Navbar, Nav, Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getAccess, urlHome } from '../common'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actived: null,
            access: [],
        }
    }

    componentDidMount() {
        const { type } = this.props
        this.setState({
            access: getAccess(type),
        })
    }

    links = () => {
        const { access } = this.state
        return (
            <Fragment>
                {access.map(({ name, to }, i) => (
                    <Link key={i} to={to} className='nav-link'>
                        {name}
                    </Link>
                ))}
            </Fragment>
        )
    }

    render() {
        const { username, type, exit } = this.props

        return (
            <Navbar bg='danger' variant='dark' expand='lg'>
                <Link to={urlHome} className='navbar-brand'>
                    RestaurantApp
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>{this.links()}</Nav>
                    <Dropdown as={ButtonGroup}>
                        <Button variant='info'>
                            {username}({type})
                        </Button>
                        <Dropdown.Toggle
                            split
                            variant='outline-light'
                            id='dropdown-split-basic'
                        />

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={exit}>Salir</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header
