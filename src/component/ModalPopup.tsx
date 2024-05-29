import React from "react";
import { Modal } from "@mui/material";
import "../style/ModalPopup.css";

type Props = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

const ModalPopup = ({ open, handleClose, children }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal_popup">{children}</div>
    </Modal>
  );
};

export default ModalPopup;
