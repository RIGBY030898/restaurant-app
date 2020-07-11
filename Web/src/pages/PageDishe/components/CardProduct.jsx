import React, { Component } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'

import { updateProduct, deleteProduct } from '../../../service'

class CardProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            details: '',
            price: 0,
            count: 0,
            nameEdit: 'Editar',
            nameDelete: 'Eliminar',
            auxProduct: {},
        }
    }

    componentDidMount() {
        const { details, price, count } = this.props
        this.setState({ details: details, price: price, count: count })
    }

    handleChangeDetails = ({ target: { value } }) => {
        this.setState({ details: value })
    }

    handleChangePrice = ({ target: { value } }) => {
        this.setState({ price: value })
    }

    handleChangeCount = ({ target: { value } }) => {
        this.setState({
            count: value,
        })
    }

    setEdit = (e) => {
        e.preventDefault()
        const { edit, details, price, count } = this.state
        const { name, image, reference } = this.props
        if (edit) {
            this.setState({
                edit: !edit,
                nameEdit: 'Editar',
                nameDelete: 'Eliminar',
            })
            updateProduct(reference, {
                name: name,
                image: image,
                details: details,
                price: price,
                count: count,
            })
        } else {
            this.setState({
                edit: !edit,
                nameEdit: 'Guardar',
                nameDelete: 'Cancelar',
                auxProduct: { details: details, price: price, count: count },
            })
        }
    }

    setDelete = (e) => {
        e.preventDefault()
        const { edit } = this.state
        if (edit) {
            const { details, price, count } = this.state.auxProduct
            this.setState({
                edit: !edit,
                nameEdit: 'Editar',
                nameDelete: 'Eliminar',
                details: details,
                price: price,
                count: count,
            })
        } else {
            const { reference, name } = this.props
            deleteProduct(reference, name)
        }
    }

    render() {
        const { image, name } = this.props
        const { edit, details, price, count, nameEdit, nameDelete } = this.state
        return (
            <Card className='m-2'>
                <Card.Img variant='top' src={image} />
                <Card.Body className='bg-light'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <Form.Control
                            as='textarea'
                            value={details}
                            rows={3}
                            onChange={this.handleChangeDetails}
                            disabled={!edit}
                        />
                    </Card.Text>
                    <Card.Text>
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Precio:
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Control
                                    type='number'
                                    step='0.5'
                                    value={price}
                                    onChange={this.handleChangePrice}
                                    min={1}
                                    disabled={!edit}
                                />
                            </Col>
                            <Form.Label column sm={2}>
                                bs.
                            </Form.Label>
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Cantidad:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type='number'
                                    value={count}
                                    onChange={this.handleChangeCount}
                                    min={1}
                                    disabled={!edit}
                                />
                            </Col>
                        </Form.Group>
                    </Card.Text>
                    <Row>
                        <Col sm={6}>
                            <center>
                                <Button
                                    variant='outline-success'
                                    className='rounded-pill'
                                    onClick={this.setEdit}
                                >
                                    {nameEdit}
                                </Button>
                            </center>
                        </Col>
                        <Col sm={6}>
                            <center>
                                <Button
                                    variant='outline-danger'
                                    className='rounded-pill'
                                    onClick={this.setDelete}
                                >
                                    {nameDelete}
                                </Button>
                            </center>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default CardProduct
