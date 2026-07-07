import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, message } from "antd";

export interface ShowPassModalProps {
  name: string;
}

export interface PasswordModalRef {
  showModal: (param: ShowPassModalProps) => void;
}

const PasswordModal = forwardRef<PasswordModalRef, {}>((_props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({ showModal }));

  const showModal = (params: ShowPassModalProps) => {
    console.log(params);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("修改密码成功 🎉");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnHidden={true}>
      <p>This is Password...</p>
      <p>This is Password...</p>
      <p>This is Password...</p>
    </Modal>
  );
});

PasswordModal.displayName = "PasswordModal";

export default PasswordModal;
