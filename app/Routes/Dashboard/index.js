import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import Select from 'react-select'

import ConnectionManager from '../../Socket'

import Container from '../../Components/Container'
import Flex from '../../Components/Container/Flex'
import Icon from '../../Components/Icon'
import Text from '../../Components/Text'
import { joinChannel } from '../../Actions/socketActions'
import Audio from '../../Components/Audio'
// import Button from '../../Components/Button'

const audioOutputs = [{ label: 'Default', value: '' }]
const audioInputs = [{ label: 'Default', value: '' }]

const selectStyles = {
    control: styles => ({
        ...styles,
        backgroundColor: '#25252b',
        borderColor: 'white',
        width: '16em',
        marginBottom: '.5em',
    }),
    container: styles => ({
        ...styles,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isFocused ? '#35353d' : '#25252b',
        color: 'white',
    }),
    singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
    menu: styles => ({
        ...styles,
        backgroundColor: '#25252b',
        borderColor: 'white',
        marginTop: '-.5em',
        zIndex: 1000,
    }),
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audioInput: audioInputs[0],
            audioOutput: audioOutputs[0],

            audioInputs,
            audioOutputs,
        }
    }

    componentDidMount = () => {
        this.updateDeviceList()
        ConnectionManager.ref = this
        navigator.mediaDevices.addEventListener('devicechange', this.updateDeviceList)
        const audio = document.getElementById('output')
        audio.srcObject = ConnectionManager.incomingAudioOutput.stream
        audio.play()
    }

    componentWillUnmount = () => {
        navigator.mediaDevices.removeEventListener('devicechange', this.updateDeviceList)
    }

    updateDeviceList = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioOutputs = []
        const audioInputs = []
        devices.forEach(device => {
            switch (device.kind) {
                case 'audiooutput':
                    audioOutputs.push({
                        value: device.deviceId,
                        label: device.label || 'Default',
                    })
                    break

                case 'audioinput':
                    audioInputs.push({
                        value: device.deviceId,
                        label: device.label || 'Default',
                    })
                    break

                default:
                    break
            }
        })
        this.setState({ audioInputs, audioOutputs })
    }

    selectDevice = type => selection => {
        if (type == 'audioinput') {
            this.setState({
                audioInput: selection,
            })

            ConnectionManager.changeAudioInput(selection.value)
        } else {
            this.setState({
                audioOutput: selection,
            })

            const audio = document.getElementById('output')
            audio.setSinkId(selection.value)
        }
    }

    render = () => {
        const { channels, dispatch } = this.props
        return (
            <Container alignItems="stretch">
                {channels.map(item => (
                    <Fragment key={item.id}>
                        <Text
                            onClick={() => dispatch(joinChannel(item.id))}
                            clickable
                            size={1.1}
                            bold
                        >
                            {item.name}
                        </Text>
                        {item.users.map(user => {
                            const renderVolume =
                                ConnectionManager.socket &&
                                user.id != ConnectionManager.socket.id &&
                                ConnectionManager.incomingAudioNodes[user.id]
                            return (
                                <Text key={user.id} style={{ marginLeft: '1em' }}>
                                    {user.name}
                                    {renderVolume && (
                                        <input
                                            type="range"
                                            defaultValue="1"
                                            min="0"
                                            max="2"
                                            step="0.01"
                                            onChange={e =>
                                                (ConnectionManager.incomingAudioNodes[
                                                    user.id
                                                ].gain.gain.value = e.target.value)
                                            }
                                        />
                                    )}
                                </Text>
                            )
                        })}
                    </Fragment>
                ))}
                <Flex>
                    <Container alignItems="stretch" style={{ maxWidth: '16em', margin: '1em' }}>
                        <Text>Input:</Text>
                        <input
                            type="range"
                            defaultValue="1"
                            min="0"
                            max="2"
                            step="0.01"
                            onChange={e =>
                                (ConnectionManager.outgoingAudioGain.gain.value = e.target.value)
                            }
                        />
                        <Select
                            styles={selectStyles}
                            options={this.state.audioInputs}
                            value={this.state.audioInput}
                            onChange={this.selectDevice('audioinput')}
                        />

                        <Text>Output:</Text>
                        <input
                            type="range"
                            defaultValue="1"
                            min="0"
                            max="2"
                            step="0.01"
                            onChange={e =>
                                (ConnectionManager.incomingAudioGain.gain.value = e.target.value)
                            }
                        />
                        <Select
                            styles={selectStyles}
                            options={this.state.audioOutputs}
                            value={this.state.audioOutput}
                            onChange={this.selectDevice('audiooutput')}
                        />
                    </Container>
                </Flex>
                <audio id="output" style={{ display: 'none' }} />

                <Text>Input:</Text>
                {ConnectionManager.outgoingAudioInput && (
                    <Audio audio={ConnectionManager.outgoingAudioOutput.stream} />
                )}

                <Text>Output:</Text>
                <Audio audio={ConnectionManager.incomingAudioOutput.stream} />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
})

export default connect(mapStateToProps)(Home)
