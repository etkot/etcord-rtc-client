import { socket } from './Types'
import { utils } from '../Socket/Types'

export const addChannels = channels => ({
    type: socket.CHANNELS,
    channels,
})

export const initializeConnection = () => ({
    socket: {
        type: utils.INITIALIZE,
    },
})

export const joinChannel = id => ({
    socket: {
        type: utils.JOIN,
        data: {
            id,
        },
    },
})
