import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Route } from 'react-router-dom'
import Redirect from '../Redirect'

const ProtectedRoute = ({ component: Component, token, exact, path, redirect }) =>
    redirect ? (
        <Route
            exact={exact}
            path={path}
            component={token !== '' ? () => <Component /> : () => <Redirect to="/login" />}
        />
    ) : (
        <Route
            exact={exact}
            path={path}
            component={token !== '' ? () => <Component /> : () => <></>}
        />
    )

ProtectedRoute.propTypes = {
    token: PropTypes.string,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    path: PropTypes.string,
    redirect: PropTypes.bool,
}

ProtectedRoute.defaultProps = {
    token: '',
    path: '',
    exact: false,
    redirect: true,
}

const mapStateToProps = state => ({
    token: state.user.token,
})

export default connect(mapStateToProps)(ProtectedRoute)
