import React from 'react'
import { styled } from 'linaria/react'
import { CloudT } from '../../types'

const CloudArea = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    border-top: 1px solid #030303;
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    padding-top: 6px;
`

const Cloud: React.FC<CloudT> = ({ onDragEnter, children }) => {
    return <CloudArea onDragEnter={onDragEnter}>{children}</CloudArea>
}

export default Cloud
