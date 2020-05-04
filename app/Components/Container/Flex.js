import styled from 'styled-components'
import PropTypes from 'prop-types'

const Flex = styled.div`
    flex: ${({ size }) => size};
`

Flex.propTypes = {
    size: PropTypes.number.isRequired,
}

Flex.defaultProps = {
    size: 1,
}

export default Flex
