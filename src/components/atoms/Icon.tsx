import React from 'react'
import personIcon from '../../assets/person-icon.svg'
import loadingIcon from '../../assets/loading-icon.svg'

interface Icon {
    type: 'person' | 'loading'
}

const Icon: React.FC<Icon> = ({ type }) => {
    return (
        <>
            {type === 'person' && <img src={personIcon} alt={'person icon'} />}
            {type === 'loading' && <img src={loadingIcon} alt={'loading icon'} />}
        </>
    )
}

export default Icon
