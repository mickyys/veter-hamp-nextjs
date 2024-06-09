import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    url: string
}

export const EditButton = ({ url }: Props) => {
    return (
        <Link href={`${url}?type=edit`} className="hover:text-primary">
            <Image src={"/images/icon/icon-pencil.svg"} alt="icon" width="20" height="20" />
        </Link>
    )
}
