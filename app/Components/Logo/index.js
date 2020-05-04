import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import MoreLogo from '../../Assets/Images/logo.png'

const Img = styled.img`
    height: ${({ height }) => height};
    width: auto;
`

const Logo = ({ height }) => <Img src={MoreLogo} height={height} />

Logo.propTypes = {
    height: PropTypes.string,
}

Logo.defaultProps = {
    height: '5em',
}

export default Logo
