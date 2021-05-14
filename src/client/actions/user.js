import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from '../constants/action-types'

export function registerAction(payload) {
  return {
    type: USER_REGISTER,
    payload,
  }
}

export function loginAction(payload) {
  return {
    type: USER_LOGIN,
    payload,
  }
}

export function logoutAction() {
  return {
    type: USER_LOGOUT,
  }
}
