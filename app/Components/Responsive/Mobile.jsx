import React from 'react'
import styled from 'styled-components'

const withMediaQuery = Component => styled(Component)`
    /*  Hide menu on small screens  */
    @media (min-width: 600px) {
        display: none !important;
    }
`

const MobileComponent = withMediaQuery(({ className, children }) =>
    React.cloneElement(children, { className })
)

export default MobileComponent
