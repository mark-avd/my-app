import React from 'react'
import { styled } from 'linaria/react'

interface ButtonProps {
    onClick: () => void
}

const PrimaryButton = styled.button`
    background: #fff;
    border: 1px solid #fff;
    border-radius: 30px;
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
    font-size: medium;
    font-weight: 600;
    padding: 20px;
    width: 100%;

    &:active {
        box-shadow: -5px -8px 10px rgba(0, 0, 0, 0.1);
    }
`

const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return <PrimaryButton onClick={onClick}>Check</PrimaryButton>
}

export default Button
