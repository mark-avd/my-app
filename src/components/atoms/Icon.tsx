import React from 'react'
import personIcon from '../../assets/person-icon.svg'

interface Icon {
    type: 'person'
}

const Icon: React.FC<Icon> = ({ type }) => {
    return <>{type === 'person' && <img src={personIcon} alt={'person icon'} />}</>
}

export default Icon
