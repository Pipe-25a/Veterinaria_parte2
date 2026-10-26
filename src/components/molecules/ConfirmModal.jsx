import { Modal, Button } from 'react-bootstrap'

export function ConfirmModal(props) {
    // Extraemos los valores usando props. 
    // Si no se los pasan, usamos los valores por defecto después del '='.
    const {
        show,
        onHide,
        onConfirm,
        title = 'Confirmar acción',
        message = '¿Estás seguro de realizar esta acción?',
        variant = 'danger',
        confirmText = 'Aceptar',
        cancelText = 'Cancelar'
    } = props

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold fs-5">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
                <p className="mb-0 text-muted">{message}</p>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
                <Button variant="light" onClick={onHide} className="fw-bold">
                    {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm} className="fw-bold px-4">
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}