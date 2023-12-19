import { Dialog, DialogContent, DialogTitle } from "@mui/material";
type ModalProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
};
const Modal = (props: ModalProps) => {
  const { open, handleClose, children, title } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h5">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
