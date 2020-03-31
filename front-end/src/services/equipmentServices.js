import { restClient } from "./restClient";

const APP_ROOT = process.env.REACT_APP_DOMAIN || 'http://localhost:8080';

export const getEquipments = () => {
  const route = `${APP_ROOT}/api/equipments`;
  return restClient(route, 'GET');
}

export const getEquipmentById = (id) => {
  const route = `${APP_ROOT}/api/equipments/${id}`;
  return restClient(route, 'GET');
}

export const addEquipment = (data) => {
  const route = `${APP_ROOT}/api/equipments`;
  return restClient(route, 'POST', data);
}
