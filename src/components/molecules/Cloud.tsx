import React from 'react'
import { styled } from 'linaria/react'

const Container = styled.div`
    align-content: flex-start;
    border-top: 1px solid #030303;
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    padding-top: 6px;
`

const Cloud: React.FC = ({ children }) => {
    return <Container>{children}</Container>
}

export default Cloud
