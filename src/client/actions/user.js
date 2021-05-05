import { USER_REGISTER } from '../constants/action-types'

export function registerAction(user, password) {
  return {
    type: USER_REGISTER,
    user,
    password,
  }
}
