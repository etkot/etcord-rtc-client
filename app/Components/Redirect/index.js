import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'

const RedirectWithLocation = ({ to, location }) => (
    <Redirect
        to={{
            pathname: to,
            state: { from: location.pathname },
        }}
    />
)

RedirectWithLocation.propTypes = {
    to: PropTypes.string.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default withRouter(RedirectWithLocation)
