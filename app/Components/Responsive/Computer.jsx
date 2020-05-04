import React from 'react'
import styled from 'styled-components'

const withMediaQuery = Component => styled(Component)`
    /*  Hide menu on small screens  */
    @media (max-width: 600px) {
        display: none !important;
    }
`

const ComputerComponent = withMediaQuery(({ className, children }) =>
    React.cloneElement(children, { className })
)

export default ComputerComponent
