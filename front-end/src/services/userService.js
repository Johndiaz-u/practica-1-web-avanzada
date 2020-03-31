import { restClient, autheticatewithCredentials } from "./restClient";

const APP_ROOT = process.env.REACT_APP_DOMAIN || 'http://localhost:8080';

export const getUsers = () => {
  const route = `${APP_ROOT}/api/users`;
  return restClient(route, `GET`);
}

export const getUser = (id) => {
  const route = `${APP_ROOT}/api/users/${id}`;
  return restClient(route, `GET`);
}

export const editUser = (data) => {
  const route = `${APP_ROOT}/api/users/${data.id}`;
  return restClient(route, `PUT`, data);
}

export const deleteUser = (data) => {
  const route = `${APP_ROOT}/api/users`;
  return restClient(route, `DELETE`, data);
}

export const loginUser = (userLogin) => {
  const route = `${APP_ROOT}/api/auth/signin`;
  return autheticatewithCredentials(route, `POST`, userLogin);
}

export const addUser = (user) => {
  const route = `${APP_ROOT}/api/auth/signup`;
  return autheticatewithCredentials(route, `POST`, user);
}

export const meUser = () => {
  const route = `${APP_ROOT}/api/users/me`;
  return restClient(route, `GET`);
}

export const uploadPhoto = (photo) => {
  const route = `${APP_ROOT}/api/users/photo`;
  return restClient(route, `PUT`, photo);
}
