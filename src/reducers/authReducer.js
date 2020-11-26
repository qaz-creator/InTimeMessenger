import { authConstant } from '../actions/constants'

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  authenticating: false,
  authenticated: false,
  error: null,
}

export default (state = initState, action) => {
  console.log(action)

  switch (action.type) {
    case `${authConstant.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      }
      break
    case `${authConstant.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        // firstName: action.payload.user.firstName,
        // lastName: action.payload.user.lastName,
        // email: action.payload.user.email,
        authenticated: true,
        authenticating: false,
      }
      break
    case `${authConstant.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      }
      break
    case `${authConstant.USER_LOGOUT}_REQUEST`:
      break
    case `${authConstant.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      }
      break
    case `${authConstant.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      }
      break
    case `${authConstant.USER_NAME_CHANGE}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
      }
      break
    case `${authConstant.USER_NAME_CHANGE}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      }
      break
  }

  return state
}
