import { auth } from './Types'

export const loginCallback = (token, user) => ({
    type: auth.LOGIN_CALLBACK,
    token,
    user,
})

export const singin = (email, password, firstName, lastName, telegramUsername) => ({
    type: auth.SIGN_IN,
    payload: {
        request: {
            method: 'POST',
            url: '/users',
            data: {
                email,
                password,
                firstName,
                lastName,
                telegramUsername,
            },
        },
    },
})

export const logout = () => ({
    type: auth.LOGOUT,
})
