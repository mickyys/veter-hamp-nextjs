'use client'
import React from 'react'
import { ModalConfirmation } from '../Modal/ModalConfirmation'

interface Props {
    id: string,
    name: string,
}

export const RemoveButton = ({id, name} : Props) => {

    const onCancel = () => {
        console.log('cancel', id)
    }
    const onConfirm = () => {
        console.log('confirm', id)
    }

    return (
        <ModalConfirmation 
            icon={'/images/icon/icon-garbage.svg'} 
            title={"Eliminar"} 
            text={<p>¿Estás seguro de eliminar a <b>{name}</b>?</p>} 
            onCancel={onCancel} 
            onConfirm={onConfirm} 
        />
    )
}
