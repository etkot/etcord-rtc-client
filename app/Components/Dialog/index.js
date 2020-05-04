import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '../Container'
import Text from '../Text'

const OutsideContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    overflow-y: auto;
    padding: 2em 0;
    height: calc(100% - 4em);
    width: 100%;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(0, 0, 0, 0.7);
`

const Content = styled(Container)`
    width: 25em;
    background-color: #654c4c;
    border-radius: 4px;
    align-items: stretch;
`

const Header = styled.div`
    font-size: 1.5em;
    font-weight: bold !important;
    background-color: #a63a3a;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.7em;
    border-radius: 4px 4px 0 0;
`

const Dialog = ({ children, open, handleClose, label }) => {
    const node = useRef()

    const handleClickOutside = e => {
        if (!node.current.contains(e.target)) {
            handleClose()
        }
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <OutsideContainer open={open}>
            <Content ref={node}>
                {label !== '' && (
                    <Header>
                        <Text bold>{label}</Text>
                    </Header>
                )}
                {children}
            </Content>
        </OutsideContainer>
    )
}

Dialog.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    label: PropTypes.string,
}

Dialog.defaultProps = {
    handleClose: () => {},
    label: '',
}

export default Dialog
