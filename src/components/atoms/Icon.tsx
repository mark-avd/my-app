import React from 'react'
import personIcon from '../../assets/person-icon.svg'

interface IconProps {
    type: 'person' | 'loading'
}

const Icon: React.FC<IconProps> = ({ type }) => {
    return (
        <>
            {type === 'person' && <img src={personIcon} alt={'person icon'} width={159} height={150} />}
        </>
    )
}

export default Icon
