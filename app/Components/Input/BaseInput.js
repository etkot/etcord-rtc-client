import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Label from './Label'
import Container from '../Container'

const Input = styled.input`
    flex: 1;
    margin-top: 2em;
    background: none;
    border: none;
    border-bottom: ${({ theme }) => theme.border.default};
    padding: 5px 0 0 0;
    height: 2em;
    position: relative;
    z-index: 20;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        list-style-type: none;
        outline: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0) inset !important;
        -webkit-text-fill-color: $white !important;
        -webkit-transition-delay: 9999s;
        -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    }
`

const Textarea = styled.textarea`
    flex: 1;
    margin-top: 2.5em !important;
    background: none;
    border: none;
    border: ${({ theme }) => theme.border.default};
    border-radius: 4px;
    padding: 5px 5px 5px 5px;
    height: 2em;
    height: 5em;
    position: relative;
    z-index: 20;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        list-style-type: none;
        outline: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0) inset !important;
        -webkit-text-fill-color: $white !important;
        -webkit-transition-delay: 9999s;
        -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    }
`

const BaseInput = ({
    value,
    onChange,
    placeholder,
    onBlur,
    onFocus,
    className,
    type,
    multiline,
}) => {
    const [active, setActive] = useState(false)

    return (
        <Container vertical={false} alignItem="flex-start" justifyContent="flex-start">
            {placeholder && !multiline && (
                <Label active={active || value !== ''}>{placeholder}</Label>
            )}
            {multiline ? (
                <Textarea
                    value={value}
                    onChange={onChange}
                    className={className}
                    type={type}
                    placeholder={placeholder || ''}
                    onFocus={() => {
                        onFocus()
                        setActive(true)
                    }}
                    onBlur={() => {
                        onBlur()
                        setActive(false)
                    }}
                />
            ) : (
                <Input
                    value={value}
                    onChange={onChange}
                    className={className}
                    type={type}
                    onFocus={() => {
                        onFocus()
                        setActive(true)
                    }}
                    onBlur={() => {
                        onBlur()
                        setActive(false)
                    }}
                />
            )}
        </Container>
    )
}

BaseInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    multiline: PropTypes.bool,
}

BaseInput.defaultProps = {
    placeholder: '',
    onBlur: () => {},
    onFocus: () => {},
    className: '',
    type: 'text',
    multiline: false,
}

export default BaseInput
