import { restClient } from "./restClient";

const APP_ROOT = process.env.REACT_APP_DOMAIN || 'http://localhost:8080';

export const getFamilies = () => {
    const route = `${APP_ROOT}/api/families`;
    return restClient(route, `GET`);
}

export const getFamily = (data) => {
    const route = `${APP_ROOT}/api/families/${data.id}`;
    return restClient(route, `GET`);
}

export const postFamily = (data) => {
    const route = `${APP_ROOT}/api/families`;
    return restClient(route, `POST`, data);
}
