import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../services/instagram-api';
import EMOTIONS_API from '../services/emotions-api';

const EMOTIONS_TO_EMOJI_MAPPER = {
  anger: '😡',
  contempt: '😀',
  disgust: '🤮',
  fear: '🙀',
  happiness: '😂',
  neutral: '😐',
  sadness: '☹️',
  surprise: '😲'
};

const EPhoto = ({ url, onEmojify, emotions = [] }) => {
  const faces = emotions.map(singleFace => {
    const { faceRectangle: { height, top, left }, scores } = singleFace;
    const topEmotionScore = Math.max(...Object.values(scores));
    const topEmotion = Object.entries(scores).find(
      ([key, value]) => value === topEmotionScore
    )[0];
    return {
      emoji: EMOTIONS_TO_EMOJI_MAPPER[topEmotion],
      left,
      top,
      fontSize: height
    };
  });

  return (
    <p style={{ position: 'relative' }}>
      {faces.map((props, i) => {
        const { left, top, fontSize } = props;
        return (
          <span key={i} className="ephoto" style={{ left, top, fontSize }}>
            {props.emoji}
          </span>
        );
      })}
      <img src={url} />
      <button onClick={() => onEmojify(url)}>Emojify</button>
    </p>
  );
};

class Home extends Component {
  constructor() {
    super();

    this.emojify = this.emojify.bind(this);
    this.state = {
      hasAuth: API.hasAuth(),
      isLoading: false,
      error: null,
      data: [],
      emotions: {}
    };
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    API.getPhotos().then(
      data => this.setState({ data, error: null, isLoading: false }),
      error => this.setState({ data: [], error, isLoading: false })
    );
  }
  emojify(imageUrl) {
    console.log(`Emojyfying ${imageUrl}`);
    EMOTIONS_API(imageUrl).then(data => {
      console.log(data);
      this.setState({
        emotions: {
          ...this.state.emotions,
          [imageUrl]: data
        }
      });
    });
  }
  renderHome() {
    const { emotions, isLoading, error, data } = this.state;
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
              <EPhoto
                emotions={emotions[url]}
                onEmojify={this.emojify}
                url={url}
              />
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
