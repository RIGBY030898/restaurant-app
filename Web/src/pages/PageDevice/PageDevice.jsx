import React, { Component, Fragment } from 'react'

import { getAllDevices } from '../../service'
import { Container, Row, Col, Spinner } from 'react-bootstrap'

import { CardDevice } from './components'

class PageDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            devices: [],
        }
    }

    componentDidMount() {
        getAllDevices().on('value', (snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    devices: snapshot.val(),
                    show: true,
                })
            }
        })
        getAllDevices().on('child_removed', (snapshot) => {
            const { uuid } = snapshot.val()
            delete this.state.devices[uuid]
        })
    }

    showDevices = () => {
        const { devices } = this.state
        return (
            <Row>
                {Object.values(devices).map(({ name, table, uuid }) => (
                    <Col key={uuid} xl={4}>
                        <CardDevice name={name} table={table} uuid={uuid} />
                    </Col>
                ))}
            </Row>
        )
    }

    render() {
        const { show } = this.state
        return (
            <Container>
                {show ? (
                    <Fragment>{this.showDevices()}</Fragment>
                ) : (
                    <center>
                        <Spinner className='m-5' animation='border' variant='danger' />
                    </center>
                )}
            </Container>
        )
    }
}

export default PageDevice
