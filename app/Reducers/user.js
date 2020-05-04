/**
 * Login reducer
 *
 *
 */

import { auth, user } from '../Actions/Types';

const initialState = {
  token: 'validtoken',
  loading: false,
  user: {
    email: '',
    displayName: '',
    telegramUsername: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case user.GET_USER_SUCCESS:
    case user.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.data,
        },
      };

    case auth.LOGIN_CALLBACK:
      return {
        token: action.token,
        loading: false,
        user: {
          ...state.user,
          ...action.user,
        },
      };

    case auth.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
