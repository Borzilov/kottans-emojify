import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../services/instagram-api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      hasAuth: API.hasAuth(),
      isLoading: false,
      error: null,
      data: []
    };
  }
  renderHome() {
    return <h1>THIS IS HOME</h1>;
  }
  render() {
    return this.state.hasAuth ? this.renderHome() : <Redirect to="/login" />;
  }
}
export default Home;
