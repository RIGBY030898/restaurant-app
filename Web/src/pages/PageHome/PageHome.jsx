import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import './pageHome.css'

class PageHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: [],
        }
    }

    render() {
        const { logIn } = this.props

        return (
            <Fragment>
                {logIn ? (
                    <div id='container-home'>
                        <Container>
                            <div className='p-5'>
                                <center>
                                    <h1 className='text-danger'>RestaurantApp</h1>
                                </center>
                            </div>

                            <Row>
                                <Col xl={4}>
                                    <h4 className='text-danger'>Información</h4>
                                    <p>
                                        <div className='flex p-2'>
                                            <strong>Nombre: </strong>
                                            RestaurantApp
                                        </div>
                                        <div className='flex p-2'>
                                            <strong>Ubicación: </strong>
                                            Av. XXXXXXXXX
                                        </div>
                                        <div className='flex p-2'>
                                            <strong>Email: </strong>
                                            restaurant.app@gmail.com
                                        </div>
                                        <div className='flex p-2'>
                                            <strong>Categoría: </strong>
                                            Familiar
                                        </div>
                                        <div className='flex p-2'>
                                            <strong>Teléfono: </strong>
                                            +591 XXXX-XXXX
                                        </div>
                                    </p>
                                </Col>
                                <Col xl={4}>
                                    <h4 className='text-danger'>Detalles</h4>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Suscipit harum veritatis dolorum
                                        minus iure esse laboriosam nobis necessitatibus
                                        velit in consequuntur, dolorem laudantium nostrum
                                        quos impedit enim labore, laborum inventore eos
                                        accusantium a fuga odio. Placeat sapiente
                                        architecto voluptate iusto? Eaque voluptates
                                        voluptas ad, porro est dignissimos a hic! Sapiente
                                        eius molestiae reprehenderit numquam laborum sunt.
                                        Dolorem eligendi ab fuga!
                                    </p>
                                </Col>
                                <Col xl={4}>
                                    <h4 className='text-danger'>Acerca de Nosotros</h4>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Minima consequuntur itaque
                                        obcaecati expedita sint nesciunt, dicta unde
                                        reiciendis et reprehenderit placeat, eligendi
                                        beatae excepturi perferendis est ullam harum.
                                        Tempore praesentium assumenda quidem, mollitia ea
                                        excepturi similique maiores eos esse, sapiente
                                        veritatis fuga aliquid quia fugiat!
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                        <footer className='bg-dark p-4 text-light'>
                            <h5>FOOTER</h5>
                        </footer>
                    </div>
                ) : (
                    <Redirect to='/' />
                )}
            </Fragment>
        )
    }
}

export default PageHome
