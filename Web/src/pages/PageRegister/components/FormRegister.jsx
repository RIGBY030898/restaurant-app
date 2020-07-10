import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import { sizeString, jobs } from '../../../common'
import { getUserRestuarant, registerUserRestaurant } from '../../../service'

import './formRegister.css'

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRegister: '',
            passwordRegister: '',
            isValidUser: false,
            isValidPassword: false,
            isInvalidUser: false,
            isInvalidPassword: false,
            messageErrorUser: '',
            messageErrorPassword: '',
            errorRegister: false,
            errorMessage: '',
            registered: false,
            typeRegister: '',
            isValidType: false,
            isInvalidType: false,
        }
    }

    submit = (e) => {
        e.preventDefault()
        this.setState({ registered: false })
        const {
            isValidPassword,
            isValidUser,
            userRegister,
            passwordRegister,
            isValidType,
            typeRegister,
        } = this.state

        if (isValidUser && isValidPassword && isValidType) {
            this.register(userRegister, passwordRegister, typeRegister)
        } else {
            this.validatePassword(passwordRegister)
            this.validateUser(userRegister)
            this.validateType(typeRegister)
            this.setState({ errorRegister: true })
        }
    }

    register = (user, password, type) => {
        getUserRestuarant(user)
            .once('value', (snapshot) => {
                if (snapshot.exists()) {
                    this.setState({
                        errorMessage: `Ya existe el usuario ${user}, vuelva a intentar con otro nombre de usuario.`,
                        errorRegister: true,
                        isValidUser: false,
                        isInvalidUser: true,
                        messageErrorUser: 'Ya existe el usuario.',
                    })
                }
            })
            .then(() => {
                const { errorRegister } = this.state
                if (!errorRegister) {
                    var reg = registerUserRestaurant({
                        username: user,
                        password: btoa(password),
                        type: type,
                    })
                    reg.then((data) => {
                        this.setState({
                            userRegister: '',
                            passwordRegister: '',
                            typeRegister: '',
                            registered: true,
                            isValidUser: false,
                            isValidPassword: false,
                            isValidType: false,
                            isInvalidType: false,
                        })
                    }).catch((error) => {
                        console.error(error)
                        this.setState({
                            errorRegister: true,
                            errorMessage: error,
                        })
                    })
                }
            })
    }

    handleChangeUser = ({ target: { value } }) => {
        const nullSpace = value.replace(/ /g, '')
        this.validateUser(nullSpace)
        this.setState({ userRegister: nullSpace })
    }

    validateUser = (string) => {
        const { message, error } = sizeString(4, 16, string)
        this.setState({
            messageErrorUser: message,
            isInvalidUser: error,
            isValidUser: !error,
        })
        if (error) {
            this.setState({
                errorMessage: 'Verifique los campos y vuelva a intentarlo.',
            })
        }
    }

    handleChangePassword = ({ target: { value } }) => {
        this.setState({ passwordRegister: value })
        this.validatePassword(value)
    }

    validatePassword = (string) => {
        const { message, error } = sizeString(8, 20, string)
        this.setState({
            messageErrorPassword: message,
            isInvalidPassword: error,
            isValidPassword: !error,
        })
        if (error) {
            this.setState({
                errorMessage: 'Verifique los campos y vuelva a intentarlo.',
            })
        }
    }

    handleChangeType = ({ target: { value } }) => {
        this.setState({
            typeRegister: value,
            isValidType: value !== '',
            isInvalidType: value === '',
        })
    }

    validateType = (type) => {
        this.setState({
            isInvalidType: type === '',
        })
    }

    showJobs = () => {
        return (
            <Fragment>
                {jobs.map(({ name, job }, i) => (
                    <option key={i} value={job}>
                        {name}
                    </option>
                ))}
            </Fragment>
        )
    }

    render() {
        const { title } = this.props
        const {
            userRegister,
            passwordRegister,
            isInvalidUser,
            isInvalidPassword,
            messageErrorPassword,
            messageErrorUser,
            isValidUser,
            isValidPassword,
            errorRegister,
            registered,
            errorMessage,
            isValidType,
            isInvalidType,
            typeRegister,
        } = this.state
        return (
            <div>
                <Container className='align-self-center'>
                    <Alert
                        variant='danger'
                        onClose={() => this.setState({ errorRegister: false })}
                        show={errorRegister}
                        dismissible
                    >
                        <Alert.Heading>Oh! Tuviste algún error</Alert.Heading>
                        <p>{errorMessage}</p>
                    </Alert>
                    <Alert
                        variant='success'
                        onClose={() => this.setState({ registered: false })}
                        show={registered}
                        dismissible
                    >
                        <Alert.Heading>Yeah!! Exitoso</Alert.Heading>
                        <p>El registro fue todo un éxito.</p>
                    </Alert>
                    <Row>
                        <Col xl={4}></Col>
                        <Col
                            id='container-register'
                            xl={4}
                            className='bg-secondary pb-5 pl-5 pr-5 rounded'
                        >
                            <p className='h5 text-center pb-3 pt-2 text-light'>{title}</p>
                            <Form noValidate onSubmit={this.submit}>
                                <Form.Group controlId='formUser'>
                                    <Form.Label className='text-light'>
                                        Nombre de usuario
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese su nombre de usuario'
                                        onChange={this.handleChangeUser}
                                        value={userRegister}
                                        isInvalid={isInvalidUser}
                                        isValid={isValidUser}
                                        onFocus={() => {
                                            this.setState({ errorRegister: false })
                                            this.setState({ registered: false })
                                        }}
                                    />
                                    <Form.Text
                                        className='text-warning'
                                        id='passwordHelpBlock'
                                    >
                                        No se acepta espacios.
                                    </Form.Text>
                                    <Form.Control.Feedback type='invalid'>
                                        {messageErrorUser}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='formPassword'>
                                    <Form.Label className='text-light'>
                                        Contraseña
                                    </Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Ingrese su contraseña'
                                        onChange={this.handleChangePassword}
                                        value={passwordRegister}
                                        isInvalid={isInvalidPassword}
                                        isValid={isValidPassword}
                                        onFocus={() => {
                                            this.setState({ errorRegister: false })
                                            this.setState({ registered: false })
                                        }}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {messageErrorPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Row} controlId='formGridState'>
                                    <Form.Label
                                        column
                                        sm='4'
                                        className='text-light text-center'
                                    >
                                        Cargo
                                    </Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            as='select'
                                            onChange={this.handleChangeType}
                                            isValid={isValidType}
                                            isInvalid={isInvalidType}
                                            value={typeRegister}
                                            onFocus={() => {
                                                this.setState({ errorRegister: false })
                                                this.setState({ registered: false })
                                            }}
                                        >
                                            <option value='' selected>
                                                Seleccione...
                                            </option>
                                            {this.showJobs()}
                                        </Form.Control>
                                        <Form.Control.Feedback type='invalid'>
                                            Debe seleccionar un cargo.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Button
                                    className='rounded-pill'
                                    type='submit'
                                    variant='success'
                                    block
                                >
                                    Registrar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FormRegister
