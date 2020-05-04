import React from 'react'
import { PulseLoader } from 'halogenium'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
    margin: 1em 0;
`

const Loading = ({ theme }) => (
    <Container style={{ textAlign: 'center' }}>
        <PulseLoader size="1em" color={theme.colors.accent} />
    </Container>
)

Loading.propTypes = {
    theme: PropTypes.shape({
        colors: PropTypes.shape({
            accent: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default withTheme(Loading)
