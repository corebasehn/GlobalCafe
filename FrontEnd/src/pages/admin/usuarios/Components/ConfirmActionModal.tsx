import { Modal, Button } from 'react-bootstrap';
import type { User } from "../../../../api/users.api";

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
    <Modal show={show} onHide={onClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-neutral-600 mb-0">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant={variant} onClick={onConfirm}>{actionLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
}
