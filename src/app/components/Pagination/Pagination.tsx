'use client'
import { Pagination } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    page: number
    total: number
    path: string;
}

export const PaginationUI = ({ page, total, path }: Props) => {

    const route = useRouter();

    return (
        <Pagination
            variant="light"
            className="gap-2"
            isCompact
            showControls
            onChange={(page) => route.push(`${path}?page=${page}`)}
            total={total} initialPage={page} />
    )
}
