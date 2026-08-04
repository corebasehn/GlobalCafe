import { Modal, Button } from 'react-bootstrap';

interface ConfirmActionModalProps {
  show: boolean;
  title: string;
  message: React.ReactNode;
  variant: "danger" | "success";
  actionLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmActionModal({
  show,
  title,
  message,
  variant,
  actionLabel,
  onClose,
  onConfirm
}: ConfirmActionModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-18">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-4">
        <div className="text-muted fs-14">{message}</div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-top-0 pt-0">
        <Button variant="light" className="btn-wave" onClick={onClose}>Cancelar</Button>
        <Button variant={variant} className="btn-wave" onClick={onConfirm}>{actionLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
}

