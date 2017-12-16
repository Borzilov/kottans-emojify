import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../services/instagram-api';

const EPhoto = ({ url, onEmojify }) => {
  return (
    <p>
      <img src={url} />
      <button onClick={() => onEmojify(url)}>Emojify</button>
    </p>
  );
};

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
  componentWillMount() {
    this.setState({ isLoading: true });
    API.getPhotos().then(
      data => this.setState({ data, error: null, isLoading: false }),
      error => this.setState({ data: [], error, isLoading: false })
    );
  }
  emojify(url) {
    console.log(`Emojyfying ${url}`);
  }
  renderHome() {
    const { isLoading, error, data } = this.state;
    if (isLoading) {
      return <span>Loading...</span>;
    }
    return error ? (
      <span>Sorry, error: {error}</span>
    ) : (
      <ul>
        {data.map(photoObjs => {
          const id = photoObjs.id;
          return photoObjs.urls.map((url, index) => (
            <li key={`${id}-${index}`}>
              <EPhoto onEmojify={this.emojify} url={url} />
            </li>
          ));
        })}
      </ul>
    );
  }
  render() {
    return this.state.hasAuth ? this.renderHome() : <Redirect to="/login" />;
  }
}
export default Home;
