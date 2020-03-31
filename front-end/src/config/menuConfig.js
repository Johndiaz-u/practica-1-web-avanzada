export const menuProfile = (data) => {
  return [{
    'id': 1,
    'href': '/profile',
    'name': `${data.name}`
  }]
}

export const generalMenu = (language, userLogged) => {
  // console.log(userLogged, 'generalMenu')
  if (userLogged == undefined)
    return []
  else if (userLogged.authorities != undefined && (userLogged.authorities[0].authority === "ROLE_ADMIN" || (userLogged.authorities.length > 1 && userLogged.authorities[1].authority === "ROLE_ADMIN"))) {
    return [
      {
        'id': 2,
        'icon': 'user',
        'name': `${language.clients}`,
        'href': '/clients',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      }, {
        'id': 3,
        'icon': 'user',
        'name': `${language.users}`,
        'href': '/users',
      },
      {
        'id': 4,
        'icon': 'snippets',
        'name': `${language.families}`,
        'href': '/families',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      },
      {
        'id': 5,
        'icon': 'appstore',
        'name': `${language.equipments}`,
        'href': '/equipments',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      },
      {
        'id': 6,
        'icon': 'inbox',
        'name': `${language.rentals}`,
        'href': '/rentals',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      }
    ]
  } else {
    return [
      {
        'id': 4,
        'icon': 'snippets',
        'name': `${language.families}`,
        'href': '/families',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      },
      {
        'id': 5,
        'icon': 'appstore',
        'name': `${language.equipments}`,
        'href': '/equipments',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      },
      {
        'id': 6,
        'icon': 'inbox',
        'name': `${language.rentals}`,
        'href': '/rentals',
        'roles': ['ROLE_ADMIN', 'ROLE_USER']
      }
    ]
  }
}

export const subMenuConst = (language, userLogged) => {
  // console.log(userLogged, 'subMenuConst')
  if (userLogged == undefined || userLogged.authorities == undefined
    || (userLogged.authorities.length == 1 && userLogged.authorities[0].authority !== "ROLE_ADMIN")
    || (userLogged.authorities.length > 1 && userLogged.authorities[0].authority !== "ROLE_ADMIN" && userLogged.authorities[1].authority !== "ROLE_ADMIN"))
    return []
  else {
    return [
      {
        id: 1,
        icon: 'bar-chart',
        name: `${language.statistics}`,
        menu: [
          {
            'id': 7,
            'icon': 'bar-chart',
            'name': `${language.not_returned_rentals}`,
            'href': '/stats'
          },
          {
            'id': 8,
            'icon': 'bar-chart',
            'name': `${language.history_rentals}`,
            'href': '/stats/family'
          }
        ],
        roles: ['ROLE_ADMIN', 'ROLE_USER']
      }
    ];
  }
}

export default generalMenu;
