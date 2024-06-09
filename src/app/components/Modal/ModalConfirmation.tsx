'use client'
import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import Image from 'next/image';

interface Props {
  icon: string;
  title: string;
  text: string | React.ReactElement;
  onCancel: ()=> void;
  onConfirm: ()=> void;
}

export const ModalConfirmation = ({icon, title, text, onCancel, onConfirm} : Props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const onCloseModal = (onClose : any) => {
    onCancel();
    onClose();
  };

  const onConfirmModal = (onClose : any) => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Image onClick={onOpen} className='cursor-pointer dark:invert' src={icon} alt='title' width={20} height={20}/>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                
                  {text}
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => onCloseModal(onClose)}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => onConfirmModal(onClose)}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
