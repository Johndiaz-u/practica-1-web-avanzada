import { restClient } from "./restClient";

const APP_ROOT = process.env.REACT_APP_DOMAIN || 'http://localhost:8080';

export const getClients = () => {
  const route = `${APP_ROOT}/api/clients`;
  return restClient(route, `GET`);
}
