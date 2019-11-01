export function apiFetch(url, options = {}) {
  console.log('api fetch url', url, 'options', options);
  const { headers, body, ...rest } = options;

  const modifiedOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (options.body) {
    modifiedOptions.body = JSON.stringify(body);
  }

  return fetch(url, {
    ...rest,
    ...modifiedOptions,
  })
    .then(response => response.json())
    .then(response => {
      console.log('got api response', response);
      return response;
    })
    .catch(err => {
      console.log('got api error', err);
      return err;
    });
}

export default {
  apiFetch,
}