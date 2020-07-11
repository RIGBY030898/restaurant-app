import React, { Component } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'

import { updateDevice, removeDevice } from '../../../service'

class CardDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            color: '',
            edit: false,
            table: 0,
            nameEdit: 'Editar',
            nameDelete: 'Eliminar',
            auxDevice: {},
        }
    }

    componentDidMount() {
        const { name, table } = this.props
        this.setState({ table: table })
        if (name === undefined || name === '') {
            this.setState({ name: 'El dispositivo no tiene nombre', color: 'bg-warning' })
        } else {
            this.setState({ name: name, color: 'bg-light' })
        }
    }

    handleChangeName = ({ target: { value } }) => {
        this.setState({ name: value })
    }

    handleChangeTable = ({ target: { value } }) => {
        this.setState({ table: value })
    }

    setEdit = (e) => {
        e.preventDefault()
        const { edit, name, table } = this.state
        const { uuid } = this.props
        if (edit) {
            this.setState({
                edit: !edit,
                nameEdit: 'Editar',
                nameDelete: 'Eliminar',
            })
            if (name === '') {
                this.setState({
                    name: 'El dispositivo no tiene nombre',
                    color: 'bg-warning',
                })
            } else {
                this.setState({ color: 'bg-light' })
            }
            updateDevice({ name: name, table: table, uuid: uuid })
        } else {
            this.setState({
                edit: !edit,
                nameEdit: 'Guardar',
                nameDelete: 'Cancelar',
                auxDevice: { name: name, table: table },
            })
        }
    }

    setDelete = (e) => {
        e.preventDefault()
        const { edit } = this.state
        if (edit) {
            const { name, table } = this.state.auxDevice
            this.setState({
                edit: !edit,
                nameEdit: 'Editar',
                nameDelete: 'Eliminar',
                name: name,
                table: table,
            })
        } else {
            const { uuid } = this.props
            removeDevice(uuid)
        }
    }

    render() {
        const { name, color, edit, table, nameEdit, nameDelete } = this.state
        return (
            <Card className={`m-4 ${color}`}>
                <Card.Body>
                    <Card.Title className='text-center'>Dispositivo</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted text-center'>
                        <Form.Control
                            type='text'
                            value={name}
                            onChange={this.handleChangeName}
                            disabled={!edit}
                        />
                    </Card.Subtitle>
                    <Card.Text>
                        <strong>Número de mesa: </strong>
                        <Form.Control
                            type='number'
                            value={table}
                            onChange={this.handleChangeTable}
                            min={1}
                            disabled={!edit}
                        />
                    </Card.Text>
                    <Row>
                        <Col sm={6}>
                            <center>
                                <Button
                                    className='rounded-pill'
                                    variant='success'
                                    onClick={this.setEdit}
                                >
                                    {nameEdit}
                                </Button>
                            </center>
                        </Col>
                        <Col sm={6}>
                            <center>
                                <Button
                                    className='rounded-pill'
                                    variant='danger'
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

export default CardDevice
