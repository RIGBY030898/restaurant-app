import React, { Component } from 'react'
import { Nav, Container, Row, Col, Button } from 'react-bootstrap'

import {
    getFoods,
    getDrinks,
    getDesserts,
    getCombos,
    referenceFood,
    referenceDrink,
    referenceDessert,
    referenceCombo,
} from '../../service'
import { Tab, RegisterProduct } from './components'

class PageDishe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: '1',
            register: false,
        }
    }

    handleChangeSelect = (eventKey) => {
        this.setState({
            activeKey: eventKey,
        })
    }

    showFood = () => {
        const { activeKey } = this.state
        return activeKey === '1'
    }

    showDrink = () => {
        const { activeKey } = this.state
        return activeKey === '2'
    }

    showDessert = () => {
        const { activeKey } = this.state
        return activeKey === '3'
    }

    showCombo = () => {
        const { activeKey } = this.state
        return activeKey === '4'
    }

    render() {
        const { activeKey, register } = this.state
        return (
            <Container>
                <Row className='mt-4'>
                    <Col sm={2}>
                        <Nav
                            variant='pills'
                            activeKey={activeKey}
                            className='flex-column'
                            onSelect={this.handleChangeSelect}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey={1}>Comidas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={2}>Bebidas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={3}>Postres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={4}>Combos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Col md={{ span: 1, offset: 11 }}>
                            <Button
                                variant='success'
                                className='rounded-circle'
                                title='Agregar plato'
                                onClick={(e) => {
                                    e.preventDefault()
                                    this.setState({ register: true })
                                }}
                            >
                                <p className='h3'>+</p>
                            </Button>
                        </Col>
                        {this.showFood() && (
                            <Tab database={getFoods()} reference={referenceFood} />
                        )}
                        {this.showDrink() && (
                            <Tab database={getDrinks()} reference={referenceDrink} />
                        )}
                        {this.showDessert() && (
                            <Tab database={getDesserts()} reference={referenceDessert} />
                        )}
                        {this.showCombo() && (
                            <Tab database={getCombos()} reference={referenceCombo} />
                        )}
                        <RegisterProduct
                            show={register}
                            onHide={() => this.setState({ register: false })}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PageDishe
