import React, { Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'

const Home = (props) => {
    const { user } = props

    return (
        <Fragment>
            {props ? (
                <Fragment>
                    {user ? (
                        <Fragment>
                            <h1>Bienvenido</h1>
                            <p>{user}</p>
                            <Link to='/register'>Registrar</Link>
                        </Fragment>
                    ) : (
                        <Redirect to='/' />
                    )}
                </Fragment>
            ) : (
                <Fragment></Fragment>
            )}
        </Fragment>
    )
}

export default Home
