import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'

import Container from '../../Components/Container'
import Flex from '../../Components/Container/Flex'
import Icon from '../../Components/Icon'
import Text from '../../Components/Text'
// import Button from '../../Components/Button'

const Label = styled.h1`
    text-align: center;
    font-size: 2.6em;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
`

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {
        const { seasons } = this.props
        // const now = new Date().getTime()
        return (
            <Container alignItems="stretch">
                <Label>Etcord is here to stay!!</Label>
            </Container>
        )
    }
}

Home.propTypes = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Home)
