export const stateInitial = {
  // urls: [],
  // url: {},
  users: [],
  // myUrls: [],
  // addUrls: [],
  // moreDetails: [],
  clients: []
}

export const stateUsers = {
  // users: [],
  // user: {},
  userLogin: {
    isAuth: false,
    photo: '',
    authorities: [{ authority: '' }],
    client: {
      id: null,
      cedula: '',
      firstName: '',
      lastName: '',
      rentals: []
    },
  },
  getAllUsers: []
  // errors: [],
  // isLoading: false,
}

export const stateClients = {
  getAllClients: []
}

export const stateLanguage = {
  getAllTexts: []
}

export const stateFamilies = {
  getAllFamilies: []
}


export const stateEquipments = {
  getAllEquipments: []
}

export const stateRentals = {
  getAllRentals: [],
  getAllRentalsFiltered: []
}

export default stateInitial;
