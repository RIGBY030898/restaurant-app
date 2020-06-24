import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Register = (props) => {
    const { typeUser } = props
    const [userRegister, setUserRegister] = useState('')
    const [passwordUser, setPasswordUser] = useState('')

    const isAdmin = () => {
        if (typeUser === 'admin') {
            return true
        } else {
            return false
        }
    }

    const handleChangeUser = (e) => {
        setUserRegister(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPasswordUser(e.target.value)
    }

    const register = () => {
        console.log(`usuario ${userRegister} registrado con contraseña ${passwordUser}`)
        setUserRegister('')
        setPasswordUser('')
    }

    return (
        <>
            {props ? (
                <>
                    {isAdmin() ? (
                        <>
                            <h1>Forumlario de registro</h1>
                            <p>Este es el formulario de registro para administradores</p>
                            <input
                                type='text'
                                placeholder='Nombre de usuario'
                                onChange={handleChangeUser}
                                value={userRegister}
                            />
                            <input
                                type='password'
                                placeholder='Ingrese la contraseña'
                                onChange={handleChangePassword}
                                value={passwordUser}
                            />
                            <button onClick={register}>Registrar</button>
                        </>
                    ) : (
                        <Redirect to='/404' />
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default Register
