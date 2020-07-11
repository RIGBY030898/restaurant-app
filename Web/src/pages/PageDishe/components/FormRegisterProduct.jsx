import React, { Component, Fragment } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

import { products, getProduct, updateProduct } from '../../../service'

class FormRegisterProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0,
            count: 0,
            type: 'Foods',
            details: '',
            image:
                'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
        }
    }

    submit = (e) => {
        e.preventDefault()
        const { type, name } = this.state
        getProduct(type, name).once('value', (snapshot) => {
            if (snapshot.exists()) {
                alert(`El plato ${name} ya existe en la BD.`)
            } else {
                const { price, count, details, image } = this.state
                updateProduct(type, {
                    count: count,
                    details: details,
                    image: image,
                    name: name,
                    price: price,
                })
                this.setState({
                    name: '',
                    price: 0,
                    count: 0,
                    type: 'Foods',
                    details: '',
                })
            }
        })
    }

    handleChangeName = ({ target: { value } }) => {
        this.setState({ name: value })
    }

    handleChangePrice = ({ target: { value } }) => {
        this.setState({ price: parseFloat(value) })
    }

    handleChangeCount = ({ target: { value } }) => {
        this.setState({ count: parseInt(value) })
    }

    handleChangeType = ({ target: { value } }) => {
        this.setState({ type: value })
    }

    handleChangeDetails = ({ target: { value } }) => {
        this.setState({ details: value })
    }

    showProducts = () => {
        return (
            <Fragment>
                {products.map(({ name, product }, i) => (
                    <option key={i} value={product}>
                        {name}
                    </option>
                ))}
            </Fragment>
        )
    }

    render() {
        const { name, price, count, type, details } = this.state
        return (
            <Form onSubmit={this.submit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            placeholder='Nombre del plato'
                            onChange={this.handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Precio (Bs.)</Form.Label>
                        <Form.Control
                            type='number'
                            value={price}
                            step='0.5'
                            min={1}
                            placeholder='Precio del plato'
                            onChange={this.handleChangePrice}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type='number'
                            value={count}
                            min={0}
                            placeholder='Cantidad del plato'
                            onChange={this.handleChangeCount}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Tipo de plato</Form.Label>
                        <Form.Control
                            as='select'
                            value={type}
                            onChange={this.handleChangeType}
                        >
                            {this.showProducts()}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Detalles</Form.Label>
                        <Form.Control
                            as='textarea'
                            value={details}
                            rows={3}
                            placeholder='Escriba los detalles del plato...'
                            onChange={this.handleChangeDetails}
                        />
                    </Form.Group>
                </Form.Row>
                <Button variant='success' type='submit'>
                    Registrar
                </Button>
            </Form>
        )
    }
}

export default FormRegisterProduct
