import stateInitial, { stateUsers, stateClients, stateLanguage, stateFamilies, stateEquipments, stateRentals } from "../model";
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { FETCH_CLIENTS_SUCCESS, LOGIN_USER_SUCCESS, FETCH_USERS_SUCCESS, FETCH_LANGUAGE_SUCCESS, FETCH_USER_SUCCESS, FETCH_FAMILIES_SUCCESS, FETCH_FAMILY_SUCCESS, FETCH_EQUIPMENTS_SUCCESS, ADD_FAMILY_REQUEST, ADD_FAMILY_SUCCESS, FETCH_RENTALS_SUCCESS, ADD_RENTAL_SUCCESS, LOGIN_ME_SUCCESS, UPDATE_EQUIPMENT_RENTAL_SUCCESS, LOGIN_ME_REQUEST, ADD_EQUIPMENTS_SUCCESS, FETCH_RENTALS_FILTERED_SUCCESS, ADD_USER_SUCCESS, UPLOAD_PHOTO_SUCCESS } from "../actions/action";

const urlReducer = (state = stateInitial, action) => {
  switch (action.type) {
    default: {
      return {
        ...state
      }
    }
  }
}

const userReducer = (state = stateUsers, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userLogged: { ...state.users, ...action.payload }
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        getAllUsers: action.payload
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        getUser: action.payload
      }
    case LOGIN_ME_SUCCESS:
      return {
        ...state,
        userLogin: { ...state.users, ...action.payload }
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        getUserLogged: action.payload
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        getUserLogged: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const updateObjectInArray = (array, payload) => {
  return array.map((item, index) => {
    if (item.id !== payload.id) {
      return item
    }
    return {
      ...item,
      ...payload
    }
  })
}

const clientReducer = (state = stateClients, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        getAllClients: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const languageReducer = (state = stateLanguage, action) => {
  switch (action.type) {
    case FETCH_LANGUAGE_SUCCESS:
      return {
        ...state,
        getAllTexts: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const familyReducer = (state = stateFamilies, action) => {
  switch (action.type) {
    case FETCH_FAMILIES_SUCCESS:
      return {
        ...state,
        getAllFamilies: action.payload
      }
    case FETCH_FAMILY_SUCCESS:
      return {
        ...state,
        getAllFamilies: action.payload
      }
    case ADD_FAMILY_SUCCESS:
      return {
        ...state,
        getAllFamilies: [...state.getAllFamilies, action.payload]
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const equipmentReducer = (state = stateEquipments, action) => {
  switch (action.type) {
    case FETCH_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        getAllEquipments: action.payload,
      }
    case ADD_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        getAllEquipments: [...state.getAllEquipments, action.payload]
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const rentalReducer = (state = stateRentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_SUCCESS:
      return {
        ...state,
        getAllRentals: action.payload
      }
    case FETCH_RENTALS_FILTERED_SUCCESS:
      return {
        ...state,
        getAllRentalsFiltered: action.payload
      }
    case ADD_RENTAL_SUCCESS:
      return {
        ...state,
        getAllRentals: action.payload
      }
    case UPDATE_EQUIPMENT_RENTAL_SUCCESS:
      return {
        ...state,
        getAllRentals: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  clients: clientReducer,
  users: userReducer,
  language: languageReducer,
  families: familyReducer,
  equipments: equipmentReducer,
  rentals: rentalReducer
})

export default rootReducer;
