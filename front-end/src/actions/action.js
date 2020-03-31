export const FETCH_URLS = 'FETCH_URLS';

//USERS :: FETCH
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

//USER :: FETCH
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

// USER :: LOGIN
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

// USER :: VERIFIED
export const LOGIN_ME_REQUEST = 'LOGIN_ME_REQUEST';
export const LOGIN_ME_SUCCESS = 'LOGIN_ME_SUCCESS';

// USER :: DELETE
export const DELETE_FROM_USER_REQUEST = 'DELETE_FROM_USER_REQUEST';
export const DELETE_FROM_USER_SUCCESS = 'DELETE_FROM_USER_REQUEST';

// USER :: UPDATE
export const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';

//USER :: ADD
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

//URLS :: FETCH
export const FETCH_URLS_REQUEST = 'FETCH_URLS_REQUEST';
export const FETCH_URLS_SUCCESS = 'FETCH_URLS_SUCCESS';

// URLS :: FETCH
export const FETCH_URLS_USER_REQUEST = 'FETCH_URLS_USER_REQUEST';
export const FETCH_URLS_USER_SUCCESS = 'FETCH_URLS_USER_SUCCESS';

//URL :: FETCH
export const FETCH_URL_REQUEST = 'FETCH_URL_REQUEST';
export const FETCH_URL_SUCCESS = 'FETCH_URL_SUCCESS';

//URL :: ADD
export const ADD_URL_REQUEST = 'ADD_URL_REQUEST';
export const ADD_URL_SUCCESS = 'ADD_URL_SUCCESS';

//URL :: UPDATE

export const UPDATE_URL_IS_REQUEST = 'UPDATE_URL_IS_REQUEST';
export const UPDATE_URL_IS_SUCCESS = 'UPDATE_URL_IS_SUCCESS';

// URL :: DELETE
export const DELETE_URL_IS_REQUEST = 'DELETE_URL_IS_REQUEST';
export const DELETE_URL_IS_SUCCESS = 'DELETE_URL_IS_SUCCESS';

export const IS_LOADING_PROCCESSING = 'IS_LOADING_PROCCESSING';
export const IS_LOADING_SUCCESS = 'IS_LOADING_SUCCESS';

export const ERROR_SUCCESS = 'ERROR_SUCCESS';

export const DELETE_FROM_URL_REQUEST = 'DELETE_FROM_URL_REQUEST';
export const DELETE_FROM_URL_SUCCESS = 'DELETE_FROM_URL_SUCCESS';

export const SEE_MORE_DETAILS_URLS_REQUEST = 'SEE_MORE_DETAILS_URLS_REQUEST';
export const SEE_MORE_DETAILS_URLS_SUCCESS = 'SEE_MORE_DETAILS_URLS_SUCCESS';

export const CHANGE_ADMIN_REQUEST = 'CHANGE_ADMIN_REQUEST';
export const CHANGE_ADMIN_SUCCESS = 'CHANGE_ADMIN_SUCCESS';

//---------------------------------------------------------------------------------------

//LANGUAGE :: FETCH
export const FETCH_LANGUAGE_REQUEST = 'FETCH_LANGUAGE_REQUEST';
export const FETCH_LANGUAGE_SUCCESS = 'FETCH_LANGUAGE_SUCCESS';
export const CHANGE_LANGUAGE_REQUEST = 'CHANGE_LANGUAGE_REQUEST';
export const CHANGE_LANGUAGE_SUCCESS = 'CHANGE_LANGUAGE_SUCCESS';

//CLIENTS :: FETCH
export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';

//FAMILIES :: FETCH
export const FETCH_FAMILIES_REQUEST = 'FETCH_FAMILIES_REQUEST';
export const FETCH_FAMILIES_SUCCESS = 'FETCH_FAMILIES_SUCCESS';

//FAMILY :: FETCH
export const FETCH_FAMILY_REQUEST = 'FETCH_FAMILY_REQUEST';
export const FETCH_FAMILY_SUCCESS = 'FETCH_FAMILY_SUCCESS';

//FAMILY :: ADD
export const ADD_FAMILY_REQUEST = 'ADD_FAMILY_REQUEST';
export const ADD_FAMILY_SUCCESS = 'ADD_FAMILY_SUCCESS';

// EQUIPMENTS :: FETCH
export const FETCH_EQUIPMENTS_REQUEST = 'FETCH_EQUIPMENTS_REQUEST';
export const FETCH_EQUIPMENTS_SUCCESS = 'FETCH_EQUIPMENTS_SUCCESS';

//RENTAL :: ADD
export const ADD_RENTAL_REQUEST = 'ADD_RENTAL_REQUEST';
export const ADD_RENTAL_SUCCESS = 'ADD_RENTAL_SUCCESS';

// RENTALS :: FETCH
export const FETCH_RENTALS_REQUEST = 'FETCH_RENTALS_REQUEST';
export const FETCH_RENTALS_SUCCESS = 'FETCH_RENTALS_SUCCESS';

export const FETCH_RENTALS_FILTERED_REQUEST = 'FETCH_RENTALS_FILTERED_REQUEST';
export const FETCH_RENTALS_FILTERED_SUCCESS = 'FETCH_RENTALS_FILTERED_SUCCESS';

// RENTALS : EQUIPMENT_RENTAL :: FETCH
export const UPDATE_EQUIPMENT_RENTAL_REQUEST = 'UPDATE_EQUIPMENT_RENTAL_REQUEST';
export const UPDATE_EQUIPMENT_RENTAL_SUCCESS = 'UPDATE_EQUIPMENT_RENTAL_SUCCESS';

export const ADD_EQUIPMENTS_REQUEST = 'ADD_EQUIPMENTS_REQUEST';
export const ADD_EQUIPMENTS_SUCCESS = 'ADD_EQUIPMENTS_SUCCESS';

// Upload Photo
export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';

export const fetchUsers = () => {
  return {
    type: FETCH_USERS_REQUEST,
  }
}

export const isLoading = () => {
  return {
    type: IS_LOADING_PROCCESSING,
  }
}

export const uploadPhoto = (photo) => {
  return {
    type: UPLOAD_PHOTO_REQUEST,
    payload: { photo: photo },
  }
}

export const deleteUrlFromAdmin = (id) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: { id }
  }
}

export const fetchUser = (id) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: { id }
  }
}

export const loginUser = (user) => {
  return {
    type: LOGIN_USER_REQUEST,
    payload: { userLogin: user }
  }
}

export const deleteUser = (data) => {
  return {
    type: DELETE_FROM_USER_REQUEST,
    payload: { data }
  }
}

export const addUser = (user) => {
  return {
    type: ADD_USER_REQUEST,
    payload: { user: user }
  }
}

export const meUser = () => {
  return {
    type: LOGIN_ME_REQUEST,
  }
}

export const fetchUrls = () => {
  return {
    type: FETCH_URLS_REQUEST,
  }
}

export const fetchUserUrls = () => {
  return {
    type: FETCH_URLS_USER_REQUEST
  }
}

export const fetchUrl = (id) => {
  return {
    type: FETCH_URL_REQUEST,
    payload: id
  }
}

export const addUrl = (url) => {
  return {
    type: ADD_URL_REQUEST,
    payload: { url: url }
  }
}

export const updateUrl = (url) => {
  return {
    type: UPDATE_URL_IS_REQUEST,
    payload: { url: url }
  }
}

export const deleteUrl = (id) => {
  return {
    type: DELETE_FROM_URL_REQUEST,
    payload: { id: id }
  }
}

export const seeDetails = (id) => {
  return {
    type: SEE_MORE_DETAILS_URLS_REQUEST,
    payload: { id }
  }
}

export const changeAdmin = (data) => {
  return {
    type: CHANGE_ADMIN_REQUEST,
    payload: { data }
  }
}

export const fetchClients = () => {
  return {
    type: FETCH_CLIENTS_REQUEST,
  }
}

export const fetchLanguage = (lang) => {
  return {
    type: FETCH_LANGUAGE_REQUEST,
    payload: { lang }
  }
}

export const changeLanguage = (lang) => {
  return {
    type: CHANGE_LANGUAGE_REQUEST,
    payload: { lang }
  }
}

export const fetchFamilies = () => {
  return {
    type: FETCH_FAMILIES_REQUEST,
  }
}

export const fetchFamily = (id) => {
  return {
    type: FETCH_FAMILY_REQUEST,
    payload: { id }
  }
}

export const addFamily = (family) => {
  return {
    type: ADD_FAMILY_REQUEST,
    payload: family
  }
}

export const editUser = (user) => {
  return {
    type: USER_EDIT_REQUEST,
    payload: user
  }
}

export const fetchEquipments = () => {
  return {
    type: FETCH_EQUIPMENTS_REQUEST,
  }
}

export const fetchRentalsByClient = (id) => {
  return {
    type: FETCH_RENTALS_REQUEST,
    payload: id
  }
}

export const fetchRentalsFiltered = (data) => {
  return {
    type: FETCH_RENTALS_FILTERED_REQUEST,
    payload: data
  }
}

export const addRental = (rental) => {
  return {
    type: ADD_RENTAL_REQUEST,
    payload: rental
  }
}

export const updateEquipmentRental = (EquipmentRental) => {
  return {
    type: UPDATE_EQUIPMENT_RENTAL_REQUEST,
    payload: EquipmentRental
  }
}

export const loginMe = (data) => {
  return {
    type: LOGIN_ME_SUCCESS,
    payload: data
  }
}
export const addEquipment = (data) => {
  return {
    type: ADD_EQUIPMENTS_REQUEST,
    payload: data
  }
}

// export const loginMe = (data) => {
//   return {
//     type: LOGIN_ME_SUCCESS,
//     payload: data
//   }
// }
