import axios from 'axios';

let getToken = () => {
  const tokenAuth = JSON.parse(localStorage.getItem("rentalUser"));
  // console.log(tokenAuth)
  let myToken = '';
  if (tokenAuth) {
    myToken = tokenAuth.token.accessToken;
  }
  return myToken || '';
}

export const restClient = (route, method, data = null) => {
  return axios(
    {
      url: route,
      method: method,
      data: data,
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      json: true
    }).then((response) => {
      return Promise.resolve(response.data)
    }).catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data)
      } else if (error.request) {
        return Promise.reject({ hasError: true, code: 401 });
      }
    })
}

export const autheticatewithCredentials = (route, method, data = null) => {
  return axios(
    {
      url: route,
      method: method,
      data: data,
      json: true
    }).then((response) => {
      return Promise.resolve(response.data)
    }).catch((error) => {
      if (error.response) {
        return Promise.reject({ hasError: true, code: 401 });
      } else if (error.request) {
        return Promise.reject({ hasError: true, code: 401 });
      }
    })
}
