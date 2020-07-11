import React from 'react'
import { Link } from 'react-router-dom'

import './pageNotFound.css'
import { Button } from 'react-bootstrap'

const PageNotFound = (props) => {
    return (
        <div id='container'>
            <p className='h1 text-danger mb-4'>Oops!! La página no existe</p>
            <div className='nav justify-content-center rounded-pill'>
                <p className='h1 text-monospace text-light text-center bg-dark p-5 rounded-circle'>
                    404
                </p>
            </div>
            <p className='text-monospace h3 text-center mb-4'>Página no encontrada</p>
            <Link to='/' className='nav justify-content-center text-decoration-none'>
                <Button className='rounded-pill' variant='outline-primary'>
                    <p className='h5'>Volver al inicio</p>
                </Button>
            </Link>
        </div>
    )
}

export default PageNotFound
