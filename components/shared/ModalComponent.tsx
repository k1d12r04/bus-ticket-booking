import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

type ModalComponentProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  header: React.ReactNode;
  body: React.ReactNode;
  footerPrimaryActionButtonText: string;
  primaryActionHandler: () => void;
};

const CustomModal = ({
  isOpen,
  onOpenChange,
  header,
  body,
  footerPrimaryActionButtonText,
  primaryActionHandler,
}: ModalComponentProps) => {
  return (
    <Modal
      hideCloseButton={true}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button
                onClick={primaryActionHandler}
                color="primary"
                onPress={onClose}
              >
                {footerPrimaryActionButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
