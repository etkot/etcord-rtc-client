import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const Text = styled.span`
    color: ${props => props.theme.colors.text};
    font-size: ${({ size }) => `${size}em`};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'inherit')};
    text-decoration: ${({ textDecoration }) => textDecoration};
    ${({ clickable }) =>
        clickable &&
        css`
            user-select: none;
            cursor: pointer;
        `}
`

const H1 = styled.h1`
    color: ${props => props.theme.colors.text};
    font-size: ${({ size }) => `${size}em`};
    text-decoration: ${({ textDecoration }) => textDecoration};
    ${({ clickable }) =>
        clickable &&
        css`
            user-select: none;
            cursor: pointer;
        `}
`

Text.propTypes = {
    bold: PropTypes.bool,
    size: PropTypes.number.isRequired,
    textDecoration: PropTypes.string,
    clickable: PropTypes.bool,
}

Text.defaultProps = {
    size: 1,
    bold: false,
    textDecoration: 'none',
    clickable: false,
}

export { H1 }
export default Text
