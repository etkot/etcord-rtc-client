import socket from 'socket.io-client'
import config from './config.json'
import { store } from '../Config'

import { socket as socketActions } from '../Actions/Types'
import { utils, rtc } from './Types'
import { addChannels } from '../Actions/socketActions'

class ConnectionManager {
    constructor() {
        this.socket = null

        this.peerConnections = {}

        this.outgoingAudioContext = new AudioContext()
        this.outgoingAudioOutput = this.outgoingAudioContext.createMediaStreamDestination()
        this.outgoingAudioInput = null
        this.outgoingAudioGain = this.outgoingAudioContext.createGain()

        this.incomingAudioContext = new AudioContext()
        this.incomingAudioOutput = this.incomingAudioContext.createMediaStreamDestination()
        this.incomingAudioNodes = {}
    }

    initialize = async () => {
        this.socket = socket(config.socket)
        this.socket.on(utils.ACTION, this.handleActions)
        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: '' },
            video: false,
        })
        this.outgoingAudioInput = this.outgoingAudioContext.createMediaStreamSource(audioStream)
        this.outgoingAudioInput
            .connect(this.outgoingAudioGain)
            .connect(this.outgoingAudioContext.destination)
    }

    changeAudioInput = async id => {
        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: id },
            video: false,
        })
        if (this.outgoingAudioInput) this.outgoingAudioInput.disconnect()
        this.outgoingAudioGain.disconnect()
        this.outgoingAudioInput = this.outgoingAudioContext.createMediaStreamSource(audioStream)
        this.outgoingAudioInput
            .connect(this.outgoingAudioGain)
            .connect(this.outgoingAudioContext.destination)
    }

    getNodes = uid => {
        if (!this.incomingAudioNodes[uid]) {
            this.incomingAudioNodes[uid] = {
                input: null,
                gain: this.incomingAudioContext.createGain(),
            }
        }

        return this.incomingAudioNodes[uid]
    }

    getConnection = uid => {
        if (!this.peerConnections[uid]) {
            this.peerConnections[uid] = new RTCPeerConnection(config.rtc)

            this.peerConnections[uid].onicecandidate = event => {
                console.log('Sendind candidate')
                const { candidate } = event
                if (candidate) {
                    this.dispatch({ type: rtc.CANDIDATE, data: { uid: uid, candidate } })
                }
            }

            this.peerConnections[uid].ontrack = ({ streams: [audio, video] }) => {
                const { gain, input } = this.getNodes(uid)
                if (input) input.disconnect()
                gain.disconnect()

                input = this.incomingAudioContext.createMediaStreamSource(audio)
                input.connect(gain).connect(this.incomingAudioContext.destination)
            }

            this.peerConnections[uid].onconnectionstatechange = event => {
                const connectionState = this.peerConnections[uid].connectionState
                switch (connectionState) {
                    case 'connected':
                        console.log(`Established connection with ${uid}`)
                        break
                    case 'disconnected':
                    case 'failed':
                        // One or more transports has terminated unexpectedly or in an error
                        break
                    case 'closed':
                        const { gain, input } = this.getNodes(uid)
                        gain.disconnect()
                        if (input) input.disconnect()
                        delete this.incomingAudioNodes[uid]
                        delete this.peerConnections[uid]
                        break
                }
            }
        }
        this.addAudioTracks(this.peerConnections[uid])
        return this.peerConnections[uid]
    }

    makeOffer = async uid => {
        const peerConnection = this.getConnection(uid)
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        this.dispatch({ type: rtc.OFFER, data: { uid, offer } })
    }

    receiveOffer = async ({ from, offer }) => {
        const peerConnection = this.getConnection(from)
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

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
        this.outgoingAudioOutput.stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, this.outgoingAudioOutput.stream)
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
