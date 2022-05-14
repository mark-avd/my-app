import React from 'react'
import { styled } from 'linaria/react'
import Icon from '../atoms/Icon'

const StyledDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin: auto;
    height: 100%;
`

const LoadingDummy: React.FC = () => {
    return (
        <StyledDiv>
            <Icon type={'loading'} />
        </StyledDiv>
    )
}

export default LoadingDummy
