import styled, { css } from 'styled-components'

const Label = styled.label`
    position: absolute;
    color: gray;
    margin-top: 1.35em;
    transition: 0.2s all ease-in-out;

    ${({ active }) =>
        active &&
        css`
            transform: translateY(-1.6em);
            font-size: 0.8em;
            color: ${({ theme }) => theme.colors.grayed};
        `}
`

const MultilineLabel = styled.label`
    position: absolute;
    color: gray;
    margin-top: -0.5em;
    margin-left: 0.3em;
    transition: 0.2s all ease-in-out;

    ${({ active }) =>
        active &&
        css`
            transform: translateY(-1.6em);
            font-size: 0.8em;
            color: ${({ theme }) => theme.colors.grayed};
        `}
`

export { MultilineLabel }
export default Label
