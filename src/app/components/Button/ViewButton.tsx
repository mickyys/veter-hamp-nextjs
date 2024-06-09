import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    url : string
}

export const ViewButton = ({ url } : Props) => {
    return (
        <Link href={url}>
            <Image className='cursor-pointer dark:invert' src={"/images/icon/icon-document.svg"} alt="icon" width={20} height={20} />
        </Link>
    )
}
