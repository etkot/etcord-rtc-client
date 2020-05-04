import PropTypes from 'prop-types'

import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
`

Container.propTypes = {
    vertical: PropTypes.bool,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
}

Container.defaultProps = {
    vertical: true,
    justifyContent: 'center',
    alignItems: 'center',
}

const ContainerAsForm = styled.form`
    display: flex;
    flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
`
ContainerAsForm.propTypes = {
    vertical: PropTypes.bool,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
}

ContainerAsForm.defaultProps = {
    vertical: true,
    justifyContent: 'center',
    alignItems: 'center',
}

export default Container
export { ContainerAsForm }
