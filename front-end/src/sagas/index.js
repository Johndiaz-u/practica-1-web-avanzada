import { takeLatest, call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { message } from "antd";
import { IS_LOADING_PROCCESSING, IS_LOADING_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_REQUEST, ERROR_SUCCESS, LOGIN_ME_SUCCESS, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_REQUEST, fetchUser, FETCH_LANGUAGE, FETCH_LANGUAGE_REQUEST, FETCH_LANGUAGE_SUCCESS, FETCH_FAMILIES_SUCCESS, FETCH_FAMILY_SUCCESS, FETCH_FAMILIES_REQUEST, FETCH_FAMILY_REQUEST, USER_EDIT_SUCCESS, FETCH_EQUIPMENTS_SUCCESS, USER_EDIT_REQUEST, FETCH_EQUIPMENTS_REQUEST, ADD_FAMILY_REQUEST, ADD_FAMILY_SUCCESS, FETCH_RENTALS_SUCCESS, ADD_RENTAL_REQUEST, ADD_RENTAL_SUCCESS, FETCH_RENTALS_REQUEST, LOGIN_ME_REQUEST, UPDATE_EQUIPMENT_RENTAL_SUCCESS, UPDATE_EQUIPMENT_RENTAL_REQUEST, FETCH_RENTALS_FILTERED_SUCCESS, FETCH_RENTALS_FILTERED_REQUEST, ADD_EQUIPMENTS_SUCCESS, ADD_EQUIPMENTS_REQUEST, ADD_USER_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_REQUEST } from "../actions/action";
import { loginUser, meUser, getUsers, getUser, editUser, addUser, uploadPhoto } from "../services/userService";
import { getClients } from "../services/clientService";
import { getTranslated } from "../services/languageService";
import { getFamily, getFamilies, postFamily } from "../services/familyService";
import { getEquipments, addEquipment } from "../services/equipmentServices";
import { getRentalsByClient, postRental, putEquipmentRental, getRentalsFiltered } from "../services/rentalService";

function* fetchUsers() {
  try {
    const users = yield call(getUsers);
    yield put({ type: FETCH_USERS_SUCCESS, payload: users.data });
  } catch (e) {
    console.log(e);
  }
}

function* getUserSaga(action) {
  try {
    const response = yield call(getUser, action.payload.id);

    yield put({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
}

function* getUserLogged() {
  try {
    const response = yield call(meUser)
    console.log(response);

    yield put({ type: LOGIN_ME_SUCCESS, payload: response.data })

  } catch (e) {
    console.log(e);
  }
}

function* getEditUserSaga(action) {
  try {
    const response = yield call(editUser, action.payload);
    message.success('User information changed.');
    yield call(getUserSaga, action)
    yield call(getUserLogged)
    yield put({ type: USER_EDIT_SUCCESS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
}

function* loginUserSaga(action) {
  try {

    yield put({ type: IS_LOADING_PROCCESSING, payload: false })

    const response = yield call(loginUser, action.payload.userLogin);
    let auth = {
      token: response,
      isAuth: true,
    }
    yield put({ type: IS_LOADING_SUCCESS, payload: true })
    yield put({ type: LOGIN_USER_SUCCESS, payload: auth })
    // yield call(getUserLogged)
    yield put({ type: ERROR_SUCCESS, payload: [] })

    localStorage.setItem("rentalUser", JSON.stringify(auth));
    const location = {
      pathname: '/'
    };
    yield put(push(location));
  } catch (e) {
    yield put({ type: ERROR_SUCCESS, payload: e })
    console.log(e);
  }
}

function* meUserSaga() {
  try {

    yield put({ type: IS_LOADING_PROCCESSING, payload: true })

    const response = yield call(meUser);
    yield put({ type: LOGIN_ME_SUCCESS, payload: { ...response.data, isAuth: true } })
    // message.success(`Welcome, ${action.payload.userLogin.name}`)
    yield put({ type: IS_LOADING_SUCCESS, payload: false })
  } catch (e) {
    if (e.code === 401) {
      localStorage.removeItem("rentalUser");
      yield put({ type: LOGIN_USER_SUCCESS, payload: null })
      yield put(push({ pathname: '/login' }))
    }
  }
}

function* getClientsSaga() {
  try {
    const response = yield call(getClients)
    yield put({ type: FETCH_CLIENTS_SUCCESS, payload: response.data })
  } catch (e) {

  }
}

function* getTranslatedSaga(action) {
  try {
    const response = yield call(getTranslated, action.payload)
    yield put({ type: FETCH_LANGUAGE_SUCCESS, payload: response })
  } catch (e) {

  }
}

function* getFamiliesSaga() {
  try {
    const response = yield call(getFamilies)
    yield put({ type: FETCH_FAMILIES_SUCCESS, payload: response })
  } catch (e) {

  }
}

function* getFamilySaga(action) {
  try {
    const response = yield call(getFamily, action.payload)
    yield put({ type: FETCH_FAMILY_SUCCESS, payload: response })
  } catch (e) {
  }
}

function* addFamilySaga(action) {
  try {
    const response = yield call(postFamily, action.payload)
    yield put({ type: ADD_FAMILY_SUCCESS, payload: response.data })
    message.success('Family added successfully');
    yield call(getFamiliesSaga);
  } catch (e) {
  }
}

function* getEquipmentsSaga() {
  try {
    const response = yield call(getEquipments);

    yield put({ type: FETCH_EQUIPMENTS_SUCCESS, payload: response.data })

  } catch (e) {
    console.log(e);
  }
}

function* addEquipmentSaga(action) {
  try {
    const response = yield call(addEquipment, action.payload)

    yield put({ type: ADD_EQUIPMENTS_SUCCESS, payload: response.data });
  } catch (e) {

  }
}

function* getRentalsSaga(action) {
  try {
    const response = yield call(getRentalsByClient, action.payload)
    yield put({ type: FETCH_RENTALS_SUCCESS, payload: response.data })
  } catch (e) {

  }
}

function* getRentalsFilteredSaga(action) {
  try {
    const response = yield call(getRentalsFiltered, action.payload)
    yield put({ type: FETCH_RENTALS_FILTERED_SUCCESS, payload: response.data })
  } catch (e) {

  }
}

function* addRentalSaga(action) {
  try {
    const response = yield call(postRental, action.payload)
    yield put({ type: ADD_RENTAL_SUCCESS, payload: response.data })
    message.success('Rental added successfully');
  } catch (e) {
  }
}

function* updateEquipmentRentalSaga(action) {
  try {
    const response = yield call(putEquipmentRental, action.payload)
    yield put({ type: UPDATE_EQUIPMENT_RENTAL_SUCCESS, payload: response.data })
    message.success('Equipment returned successfully');
  } catch (e) {
  }
}

function* addUserSaga(action) {
  try {
    const response = yield call(addUser, action.payload.user)
    // let auth = {
    //   token: response,
    //   isAuth: true,
    // }
    // yield put({ type: LOGIN_USER_SUCCESS, payload: auth })
    // localStorage.setItem("rentalUser", JSON.stringify(auth));
    const location = {
      pathname: '/'
    };
    yield put(push(location));
  } catch (e) {

  }
}

function* uploadPhotoSaga(action) {
  try {
    const response = yield call(uploadPhoto, action.payload)
    yield put({ type: UPLOAD_PHOTO_SUCCESS, payload: response.data })
    yield call(getUserSaga, { action: { payload: { id: response.data.id } } })
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(FETCH_USER_REQUEST, getUserSaga);
  yield takeLatest(USER_EDIT_REQUEST, getEditUserSaga);
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(FETCH_CLIENTS_REQUEST, getClientsSaga);
  yield takeLatest(FETCH_LANGUAGE_REQUEST, getTranslatedSaga);
  yield takeLatest(FETCH_FAMILIES_REQUEST, getFamiliesSaga);
  yield takeLatest(FETCH_FAMILY_REQUEST, getFamilySaga);
  yield takeLatest(ADD_FAMILY_REQUEST, addFamilySaga);
  yield takeLatest(FETCH_EQUIPMENTS_REQUEST, getEquipmentsSaga);
  yield takeLatest(FETCH_RENTALS_REQUEST, getRentalsSaga);
  yield takeLatest(FETCH_RENTALS_FILTERED_REQUEST, getRentalsFilteredSaga);
  yield takeLatest(ADD_RENTAL_REQUEST, addRentalSaga);
  yield takeLatest(UPDATE_EQUIPMENT_RENTAL_REQUEST, updateEquipmentRentalSaga);
  yield takeLatest(LOGIN_ME_REQUEST, getUserLogged);
  yield takeLatest(ADD_EQUIPMENTS_REQUEST, addEquipmentSaga);
  yield takeLatest(ADD_USER_REQUEST, addUserSaga);
  yield takeLatest(UPLOAD_PHOTO_REQUEST, uploadPhotoSaga);
}

export default mySaga;
