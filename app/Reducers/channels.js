import { socket } from '../Actions/Types'

const initialState = []

const channels = (state = initialState, action) => {
    switch (action.type) {
        case socket.CHANNELS:
            return action.channels

        default:
            return state
    }
}

export default channels
