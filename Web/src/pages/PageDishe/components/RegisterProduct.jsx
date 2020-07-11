import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormRegisterProduct from './FormRegisterProduct'

class RegisterProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { onHide, show } = this.props
        return (
            <Modal
                show={show}
                onHide={onHide}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Registrar Plato
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormRegisterProduct />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant='danger'>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default RegisterProduct
