/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Text from '../Text'

const Error = styled.div`
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3em;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #94272c;

    transition: transform 0.2s ease-in-out;
    will-change: transform;

    transform: translateY(4em);

    span {
        color: ${({ theme }) => theme.colors.text};
    }

    ${({ active }) =>
        active &&
        css`
            transform: translateY(0);
        `}
`

const Message = styled(Error)`
    background-color: ${({ theme }) => theme.colors.text};

    span {
        color: black;
    }
`

class Utils extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            message: false,
        }
    }

    componentDidUpdate = previousProps => {
        const { errorId, messageId } = this.props

        if (previousProps.errorId !== errorId) {
            this.setState({
                error: true,
            })
            setTimeout(() => this.setState({ error: false }), 7000)
        }

        if (previousProps.messageId !== messageId) {
            this.setState({
                message: true,
            })

            setTimeout(() => this.setState({ message: false }), 7000)
        }
    }

    render = () => {
        const { error, message } = this.state
        const { errorMessage, messageMessage } = this.props
        return (
            <>
                <Error active={error}>
                    <Text>{errorMessage}</Text>
                </Error>
                <Message active={message}>
                    <Text>{messageMessage}</Text>
                </Message>
            </>
        )
    }
}

Utils.propTypes = {
    errorId: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
    messageMessage: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    ...state.utils,
})

export default connect(mapStateToProps)(Utils)
