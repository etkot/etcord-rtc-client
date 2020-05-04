import { utils } from './Types'

export const id = () =>
    Math.random()
        .toString(36)
        .substr(2)

export const errorAction = message => ({
    type: utils.ERROR,
    message,
})

export const messageAction = message => ({
    type: utils.MESSAGE,
    message,
})
