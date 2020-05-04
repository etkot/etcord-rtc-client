import ConnectionManager from './ConnectionManager'
import { utils } from './Types'

const cm = new ConnectionManager()

export const socketMiddleware = store => next => _action => {
    if (!_action.socket) {
        next(_action)
        return
    }

    const action = _action.socket
    switch (action.type) {
        case utils.INITIALIZE:
            cm.initialize()
            break

        default:
            cm.dispatch(action)
    }
}
