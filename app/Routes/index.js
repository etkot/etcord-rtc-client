/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withTheme } from 'styled-components';

import Dashboard from './Dashboard';

import ProtectedRoute from '../Components/Auth';
import Text from '../Components/Text';
import Utils from '../Components/Utils';
import Container from '../Components/Container';
import Flex from '../Components/Container/Flex';

const Main = ({ loggedIn }) => {
  return (
    <Router>
      <Utils />
      <Switch>
        <ProtectedRoute path="/" component={Dashboard} />

        <Route>
          <Text style={{ marginTop: '1em' }}>
            404 - How the fuck did u get here???
          </Text>
        </Route>
      </Switch>
    </Router>
  );
};

Main.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object.isRequired,
    border: PropTypes.shape({
      default: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.token !== '',
});

export default withTheme(connect(mapStateToProps)(Main));
