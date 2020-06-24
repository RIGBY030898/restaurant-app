import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
//import { firebaseDatabaseReference as database } from './config'

const Login = (props) => {
    let { user, handleUser } = props

    const [userLogin, setUserLogin] = useState('')

    const handleChange = (e) => {
        setUserLogin(e.target.value)
    }

    const register = (e) => {
        handleUser(userLogin)
    }

    return (
        <Fragment>
            {props ? (
                <Fragment>
                    {user ? (
                        <Redirect to='/home' />
                    ) : (
                        <div>
                            <p>Iniciar Sesión</p>
                            <input
                                type='text'
                                value={userLogin}
                                onChange={handleChange}
                            />
                            <button onClick={register}>Ingresar</button>
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>Cargando...</Fragment>
            )}
        </Fragment>
    )
}

export default Login
