import socket from 'socket.io-client'
import config from './config.json'
import { store } from '../Config'

import { socket as socketActions } from '../Actions/Types'
import { utils, rtc } from './Types'
import { addChannels } from '../Actions/socketActions'

class ConnectionManager {
    constructor() {
        this.socket = null

        this.audioStream = false
        this.screenStream = false
        this.peerConnections = {}
    }

    initialize = async () => {
        this.socket = socket(config.socket)
        this.socket.on(utils.ACTION, this.handleActions)
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    }

    getConnection = uid => {
        if (!this.peerConnections[uid]) {
            this.peerConnections[uid] = new RTCPeerConnection(config.rtc)
        }
        this.addAudioTracks(this.peerConnections[uid])
        return this.peerConnections[uid]
    }

    makeOffer = async uid => {
        const peerConnection = this.getConnection(uid)
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        this.peerConnections[uid] = peerConnection

        this.dispatch({ type: rtc.OFFER, data: { uid, offer } })
    }

    receiveOffer = async ({ from, offer }) => {
        const peerConnection = this.getConnection(from)
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        this.peerConnections[from] = peerConnection

        this.peerConnections[from].addEventListener('icecandidate', event => {
            console.log('Sendind candidate')
            const { candidate } = event
            if (candidate) {
                this.dispatch({ type: rtc.CANDIDATE, data: { uid: from, candidate } })
            }
        })

        this.peerConnections[from].addEventListener('connectionstatechange', event => {
            if (this.peerConnections[from].connectionState === 'connected') {
                console.log('WE MADE IT!!!')
            }
        })

        console.log(this.peerConnections)
        this.dispatch({ type: rtc.ANSWER, data: { uid: from, answer } })
    }

    receiveAnswer = async ({ from, answer }) => {
        const remoteDesc = new RTCSessionDescription(answer)
        console.log(from, answer, remoteDesc)
        console.log(this.peerConnections)
        await this.peerConnections[from].setRemoteDescription(remoteDesc)
    }

    receiveCandidate = async ({ from, candidate }) => {
        console.log('Receiving candidate')
        try {
            await this.peerConnections[from].addIceCandidate(candidate)
        } catch (e) {
            console.warn('Error adding received ice candidate', e)
        }
    }

    addAudioTracks = peerConnection => {
        this.audioStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, this.audioStream)
        })
    }

    dispatch = ({ type, data = {} }) => {
        this.socket.emit(type, data)
    }

    handleActions = action => {
        switch (action.type) {
            case utils.CHANNELS:
                store.dispatch(addChannels(action.channels))
                break

            case utils.USER_JOINED:
                this.makeOffer(action.uid)
                break

            case rtc.OFFER:
                console.log(action)
                this.receiveOffer(action)
                break

            case rtc.ANSWER:
                this.receiveAnswer(action)
                break

            case rtc.CANDIDATE:
                this.receiveCandidate(action)
                break

            default:
                console.log('UNHANDLED SOCKET ACTION: ', action)
                break
        }
    }
}

export default ConnectionManager
