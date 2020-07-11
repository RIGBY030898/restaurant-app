import React, { Component, Fragment } from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'
import CardProduct from './CardProduct'

class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            dishes: [],
        }
    }

    componentDidMount() {
        const { database } = this.props
        database.on('value', (snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    dishes: snapshot.val(),
                    show: true,
                })
            } else {
                this.setState({
                    dishes: null,
                    show: false,
                })
            }
        })
    }

    showProducts = () => {
        const { dishes } = this.state
        const { reference } = this.props
        if (dishes !== null) {
            return (
                <Row>
                    {Object.values(dishes).map(
                        ({ count, details, image, name, price }) => (
                            <Col key={name} sm={6}>
                                <CardProduct
                                    count={count}
                                    details={details}
                                    image={image}
                                    name={name}
                                    price={price}
                                    reference={reference}
                                />
                            </Col>
                        )
                    )}
                </Row>
            )
        }
        return <p className='h2'>No existe ningún plato.</p>
    }

    render() {
        const { show } = this.state
        return (
            <Fragment>
                {show ? (
                    <Fragment>{this.showProducts()}</Fragment>
                ) : (
                    <center>
                        <Spinner className='m-5' animation='border' variant='danger' />
                    </center>
                )}
            </Fragment>
        )
    }
}

export default Tab
