const emotions = imageUrl =>
  fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '99207088429940fbb98d35ba0b7201ab'
    },
    body: `{"url": "${imageUrl}"}`
  }).then(resp => resp.json());
export default emotions;
