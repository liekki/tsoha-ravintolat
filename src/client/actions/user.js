import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from '../constants/action-types'

export function registerAction(user, password) {
  return {
    type: USER_REGISTER,
    user,
    password,
  }
}

export function loginAction(user, password) {
  return {
    type: USER_LOGIN,
    user,
    password,
  }
}

export function logoutAction() {
  return {
    type: USER_LOGOUT,
  }
}
