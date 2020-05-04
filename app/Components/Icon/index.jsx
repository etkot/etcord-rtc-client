import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledIcon = styled.i`
    color: ${({ theme, iconColor }) => iconColor || theme.colors.text};
    font-size: ${({ size }) => size};
`

const Icon = ({ children, size, color, onClick, style }) => (
    <StyledIcon
        style={style}
        onClick={onClick}
        size={size}
        iconColor={color}
        className="material-icons-outlined"
    >
        {children}
    </StyledIcon>
)

Icon.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    children: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onClick: PropTypes.func,
}

Icon.defaultProps = {
    style: {},
    size: '1.5em',
    color: false,
    onClick: () => {},
}

export default Icon
