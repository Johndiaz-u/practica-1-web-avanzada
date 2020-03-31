import { restClient } from "./restClient";
import moment, { lang } from 'moment';

const APP_ROOT = process.env.REACT_APP_DOMAIN || 'http://localhost:8080';

export const getRentalsByClient = (id) => {
    const route = `${APP_ROOT}/api/rentals/clients/${id}`;
    return restClient(route, `GET`);
}

export const getRentalsFiltered = (data) => {
    let start = moment(data.start).format('YYYY-MM-DD')
    let end = moment(data.end).format('YYYY-MM-DD')
    const route = `${APP_ROOT}/api/rentals/clients/${data.id}/start/${start}/end/${end}`;
    return restClient(route, `GET`);
}

export const postRental = async (data) => {
    let route = `${APP_ROOT}/api/rentals`;
    let res = await restClient(route, `POST`, data.rental);

    route = `${APP_ROOT}/api/equipmentRental`;
    await new Promise(complete => {
        for (let i = 0, p = Promise.resolve(); i <= data.equipmentRentals.length; i++) {
            p = p.then(_ => new Promise(async resolve => {
                if (i == data.equipmentRentals.length) {
                    complete()
                } else {
                    data.equipmentRentals[i].rentalId = res.data.id;
                    await restClient(route, `POST`, data.equipmentRentals[i]);
                    resolve();
                }
            }))
        }
    })
    return getRentalsByClient(data.rental.clientId);
}

export const putEquipmentRental = async (data) => {
    let route = `${APP_ROOT}/api/equipmentRental`;
    await new Promise(async complete => {
        await restClient(route, `PUT`, data);
        complete()
    })
    return getRentalsByClient(data.clientId);
}
