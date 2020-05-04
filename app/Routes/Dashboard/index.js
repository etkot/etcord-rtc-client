import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'

import Container from '../../Components/Container'
import Flex from '../../Components/Container/Flex'
import Icon from '../../Components/Icon'
import Text from '../../Components/Text'
import { joinChannel } from '../../Actions/socketActions'
// import Button from '../../Components/Button'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {
        const { channels, dispatch } = this.props
        return (
            <Container alignItems="stretch">
                {channels.map(item => (
                    <>
                        <Text
                            onClick={() => dispatch(joinChannel(item.id))}
                            key={item.id}
                            clickable
                            size={1.1}
                            bold
                        >
                            {item.name}
                        </Text>
                        {item.users.map(user => (
                            <Text key={user.id} style={{ marginLeft: '1em' }}>
                                {user.name}
                            </Text>
                        ))}
                    </>
                ))}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
})

export default connect(mapStateToProps)(Home)
