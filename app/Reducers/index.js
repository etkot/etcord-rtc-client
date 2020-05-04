/**
 * Root reducer
 */

import { combineReducers } from 'redux'

// login reducer
import user from './user'
import utils from './utils'
import channels from './channels'
import tracks from './tracks'

// export root reducer
export default combineReducers({
    user,
    utils,
    channels,
    tracks,
})
