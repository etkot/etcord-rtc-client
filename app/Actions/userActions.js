import { user } from './Types'
import { getUserSeasons } from './seasonActions'
import { messageAction } from './utilsActions'

export const getUser = () => (dispatch, getState) => {
    const {
        user: { uid },
        // token,
    } = getState().user

    dispatch({
        type: user.GET_USER,
        payload: {
            request: {
                method: 'GET',
                url: `/user/${uid}`,
            },
        },
    }).then(() => dispatch(getUserSeasons()))
}

export const updateUser = (email, displayName, telegramUsername) => (dispatch, getState) => {
    const {
        user: { uid },
    } = getState().user

    dispatch({
        type: user.UPDATE_USER,
        payload: {
            request: {
                method: 'PATCH',
                url: `/user/${uid}`,
                data: {
                    email,
                    displayName,
                    telegramUsername,
                },
            },
        },
    }).then(() =>
        dispatch(messageAction('Success! If you changed email you might need to relogin'))
    )
}
