import React, { Component } from 'react'
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'
import { getUserRestuarant } from '../../service'

import './pageLogin.css'

class PageLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userLog: '',
            passwordLog: '',
            rememberLog: false,
            errorLog: false,
            isInvalidUser: false,
            isInvalidPassword: false,
        }
    }

    componentDidMount() {
        const localPassword = localStorage.getItem('password')
        if (localPassword !== null) {
            const localUser = localStorage.getItem('user')
            this.setState({
                userLog: localUser,
                passwordLog: localPassword,
            })
        }
    }

    submit = (e) => {
        e.preventDefault()
        const { userLog, passwordLog } = this.state
        if (userLog !== '' && passwordLog !== '') {
            var user = getUserRestuarant(userLog)
            user.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    var userData = snapshot.val()
                    var { password } = userData
                    if (btoa(passwordLog) === password) {
                        const { setLogIn } = this.props
                        const { rememberLog } = this.state
                        if (rememberLog) this.save()
                        setLogIn({ username: userLog, type: userData.type })
                        //this.clearForm()
                    } else {
                        this.errorUser()
                    }
                } else {
                    this.errorUser()
                }
            })
        } else {
            this.validate()
        }
    }

    handleChangeUser = ({ target: { value } }) => {
        this.setState({
            userLog: value,
        })
    }

    validateUser = () => {
        const { errorLog, isInvalidUser } = this.state
        if (errorLog) this.setState({ errorLog: false })
        if (isInvalidUser) this.setState({ isInvalidUser: false })
    }

    handleChangePassword = ({ target: { value } }) => {
        this.setState({
            passwordLog: value,
        })
    }

    validatePassword = () => {
        const { errorLog, isInvalidPassword } = this.state
        if (errorLog) this.setState({ errorLog: false })
        if (isInvalidPassword) this.setState({ isInvalidPassword: false })
    }

    handleChangeRemember = ({ target: { checked } }) => {
        this.setState({ rememberLog: checked })
    }

    /*clearForm = () => {
        setUser('')
        setPassword('')
        setRemember(false)
    }*/

    errorUser = () => {
        this.setState({ errorLog: true })
    }

    validate = () => {
        const { userLog, passwordLog } = this.state
        this.setState({
            isInvalidUser: userLog === '',
            isInvalidPassword: passwordLog === '',
        })
    }

    save = () => {
        const { passwordLog } = this.state
        localStorage.setItem('password', passwordLog)
    }

    render() {
        const {
            errorLog,
            userLog,
            passwordLog,
            rememberLog,
            isInvalidUser,
            isInvalidPassword,
        } = this.state

        return (
            <div id='container-login' className='bg-danger'>
                <Alert
                    id='alert-error'
                    variant='danger'
                    onClose={() => this.setState({ errorLog: false })}
                    show={errorLog}
                    dismissible
                >
                    <Alert.Heading>Oh! Tuviste algún error</Alert.Heading>
                    <p>
                        El nombre de usuario o la contraseña son incorrectos, intente de
                        nuevo.
                    </p>
                </Alert>
                <Container className='align-self-center'>
                    <Row>
                        <Col xl={4}></Col>
                        <Col xl={4} className='bg-light pb-5 pl-5 pr-5 rounded'>
                            <center>
                                <h3 className='text-danger p-3'>RestaurantApp</h3>
                            </center>
                            <Form noValidate onSubmit={this.submit}>
                                <Form.Group controlId='formUser'>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Ingrese su nombre de usuario'
                                        onChange={this.handleChangeUser}
                                        value={userLog}
                                        autoComplete='username|nickname'
                                        isInvalid={isInvalidUser}
                                        onFocus={this.validateUser}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        El campo no debe estar vacío
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='formPassword'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Ingrese su contraseña'
                                        onChange={this.handleChangePassword}
                                        value={passwordLog}
                                        autoComplete='new-password|current-password'
                                        isInvalid={isInvalidPassword}
                                        onFocus={this.validatePassword}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        El campo no debe estar vacío
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId='formRemember'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Recordarme'
                                        checked={rememberLog}
                                        onChange={this.handleChangeRemember}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='success' block>
                                    Iniciar Sesión
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )

        /*return (
            <Fragment>
                {logIn ? (
                    <Redirect to='/home' />
                ) : (
                    <div id='container-login' className='bg-danger'>
                        <Alert
                            id='alert-error'
                            variant='danger'
                            onClose={() => this.setState({ errorLog: false })}
                            show={errorLog}
                            dismissible
                        >
                            <Alert.Heading>Oh! Tuviste algún error</Alert.Heading>
                            <p>
                                El nombre de usuario o la contraseña son incorrectos,
                                intente de nuevo.
                            </p>
                        </Alert>
                        <Container className='align-self-center'>
                            <Row>
                                <Col xl={4}></Col>
                                <Col xl={4} className='bg-light pb-5 pl-5 pr-5 rounded'>
                                    <center>
                                        <h3 className='text-danger p-3'>RestaurantApp</h3>
                                    </center>
                                    <Form noValidate onSubmit={this.submit}>
                                        <Form.Group controlId='formUser'>
                                            <Form.Label>Nombre de usuario</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Ingrese su nombre de usuario'
                                                onChange={this.handleChangeUser}
                                                value={userLog}
                                                autoComplete='username|nickname'
                                                isInvalid={isInvalidUser}
                                                onFocus={this.validateUser}
                                                required
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                El campo no debe estar vacío
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId='formPassword'>
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                type='password'
                                                placeholder='Ingrese su contraseña'
                                                onChange={this.handleChangePassword}
                                                value={passwordLog}
                                                autoComplete='new-password|current-password'
                                                isInvalid={isInvalidPassword}
                                                onFocus={this.validatePassword}
                                                required
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                El campo no debe estar vacío
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId='formRemember'>
                                            <Form.Check
                                                type='checkbox'
                                                label='Recordarme'
                                                checked={rememberLog}
                                                onChange={this.handleChangeRemember}
                                            />
                                        </Form.Group>
                                        <Button type='submit' variant='success' block>
                                            Iniciar Sesión
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </Fragment>
        )*/
    }
}

export default PageLogin
