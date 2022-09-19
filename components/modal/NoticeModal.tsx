import { Button, Modal } from "flowbite-react";
import { FC } from "react";
import ExclamationIcon from "@/components/icons/ExclamationIcon";

const NoticeModal: FC<{
  modalOpen: boolean;
  onCloseModal: any;
  onClickModal: any;
}> = ({ modalOpen = false, onCloseModal, onClickModal }) => {
  return (
    <Modal show={modalOpen} size="md" popup={true} onClose={onCloseModal}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 text-gray-400">
            <ExclamationIcon />
          </div>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onClickModal}>
              Yes, Im sure
            </Button>
            <Button color="gray" onClick={onCloseModal}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NoticeModal;
