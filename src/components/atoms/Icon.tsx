import React from 'react'
import personIcon from '../../assets/person-icon.svg'
import loadingIcon from '../../assets/loading-icon.svg'

interface IconProps {
    type: 'person' | 'loading'
}

const Icon: React.FC<IconProps> = ({ type }) => {
    return (
        <>
            {type === 'person' && <img src={personIcon} alt={'person icon'} width={159} height={150} />}
            {type === 'loading' && <img src={loadingIcon} alt={'loading icon'} width={16} height={16} />}
        </>
    )
}

export default Icon
