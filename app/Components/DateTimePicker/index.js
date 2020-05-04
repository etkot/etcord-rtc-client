import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'

const StyledDateTimePicker = styled(DateTimePicker)`
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    border: ${({ theme }) => theme.border.default};
    border-radius: 4px;

    div {
        border: none;
    }

    svg {
        stroke: ${({ theme }) => theme.colors.text};
    }

    input,
    span,
    i {
        color: ${({ theme }) => theme.colors.text};
    }

    .react-datetime-picker__calendar {
        z-index: 102;
    }
`

export default StyledDateTimePicker
