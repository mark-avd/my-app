import React from 'react'
import { styled } from 'linaria/react'
import Text from './Text'
import { TextProps } from '../../types'

const TextCloud = styled.div`
    background: #ffffff;
    border: #030303 solid 1px;
    border-radius: 13px 13px 13px 8px;
    padding: 6px;
    position: relative;
    width: 100%;

    &:after {
        content: '';
        position: absolute;
        border-color: transparent #ffffff;
        border-style: solid;
        border-width: 15px 15px 0 0;
        left: -15px;
        top: 80%;
        margin-top: -10px;
        z-index: 1;
    }

    &:before {
        content: '';
        position: absolute;
        border-color: transparent #030303;
        border-style: solid;
        border-width: 16px 16px 0 0;
        left: -17px;
        top: 80%;
        margin-top: -10px;
        z-index: 0;
    }
`

const Bubble: React.FC<TextProps> = ({ text }) => {
    return (
        <TextCloud>
            <Text text={text} />
        </TextCloud>
    )
}

export default Bubble
