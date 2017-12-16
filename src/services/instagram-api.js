const CLIENT_ID = '6edf7a5d0f7b4c058d220817047799da';
const API_HOST = 'https://api.instagram.com';

let token = localStorage.INSTA_TOKEN || '';
const REDIRECT_URI = `${window.location.origin}/oauth`;

const API = {
  login() {
    window.location.replace(
      `${API_HOST}/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`
    );
  },
  hasAuth() {
    return !!token;
  },
  setToken(newToken) {
    token = newToken;
    localStorage.INSTA_TOKEN = newToken;
  }
};
export default API;
