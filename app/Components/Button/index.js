import React from 'react'
import styled, { css } from 'styled-components'

import PropTypes from 'prop-types'
import Container from '../Container'

const ButtonStyled = styled.button`
    border: none;
    font-size: 1.25em;
    margin: 0.5em 0 0 0;
    padding: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    user-select: none;

    &:active,
    &:focus {
        color: ${({ theme }) => theme.colors.hightlight};
        outline: none;
    }
`

const Button = ({ onClick, children, style, className }) => (
    <ButtonStyled onClick={onClick} style={style} className={className}>
        <Container vertical={false}>{children}</Container>
    </ButtonStyled>
)

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
}

Button.defaultProps = {
    onClick: () => {},
    style: {},
    className: '',
}

const HightlightButton = styled(Button)`
    font-size: 0.8em;
    padding: 1em 2em;
    background-color: ${({ color }) => color || '#a63a3a'};
    border-radius: 4px;
    ${({ color }) =>
        (color === 'white' || color === '#ffffff') &&
        css`
            color: #121212;
        `}
`

export { HightlightButton }
export default Button
