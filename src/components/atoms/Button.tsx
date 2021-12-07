import React from 'react'
import { styled } from 'linaria/react'

const PrimaryButton = styled.button`
    background: #fff;
    border: 1px solid #fff;
    border-radius: 30px;
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
    font-size: medium;
    font-weight: 600;
    padding: 20px;
    margin-top: 32px;
    width: 100%;

    &:active {
        box-shadow: -5px -8px 10px rgba(0, 0, 0, 0.1);
    }
`

type ButtonT = {
    onClick: () => void
}

const Button: React.FC<ButtonT> = ({ onClick }) => {
    return <PrimaryButton onClick={onClick}>Check</PrimaryButton>
}

export default Button
