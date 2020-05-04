const initialState = {
    tracks: [],
}

const tracks = (state = initialState, action) => {
    switch (action.type) {
        case 'WIP':
            return {
                ...state,
            }

        default:
            return state
    }
}

export default tracks
