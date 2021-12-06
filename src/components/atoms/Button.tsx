import React from 'react'
import { styled } from 'linaria/react'

const PrimaryButton = styled.button`
    background: #fff;
    border: 1px solid #fff;
    border-radius: 20px;
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    padding: 12px;
    margin-top: 32px;
    width: 300px;

    &:active {
        box-shadow: -5px -8px 10px rgba(0, 0, 0, 0.1);
    }
`

const Button: React.FC = () => {
    return <PrimaryButton>Check</PrimaryButton>
}

export default Button
