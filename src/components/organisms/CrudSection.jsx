import { useState } from 'react'
import { Table } from '../atoms/Tables'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { FormField } from '../molecules/FormField'
import { Modal } from 'react-bootstrap'
import { ConfirmModal } from '../molecules/ConfirmModal' // <-- IMPORTAMOS EL MODAL

export function CrudSection(props) {
    const {
        title,
        columns,
        rows,
        idKey = 'id',
        fields = [],
        actions = [],
        labels = {},
        onCreate,
        onUpdate,
        onDelete,
    } = props

    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    // --- ESTADOS PARA EL MODAL DE ELIMINACIÓN ---
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    const canCreate = actions.includes('create') && onCreate
    const canEdit = actions.includes('edit') && onUpdate
    const canDelete = actions.includes('delete') && onDelete

    const handleCreate = () => {
        setFormData({})
        setIsEditing(false)
        setShow(true)
    }

    const handleEdit = (row) => {
        setFormData(row)
        setIsEditing(true)
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEditing) {
            onUpdate(formData[idKey], formData)
        } else {
            onCreate(formData)
        }
        setShow(false)
    }

    // --- LÓGICA DE ELIMINACIÓN CON MODAL ---
    const handleDeleteClick = (row) => {
        setItemToDelete(row[idKey]) // Guardamos el ID
        setShowConfirmDelete(true)  // Mostramos el modal
    }

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            onDelete(itemToDelete) // Ejecutamos la prop onDelete
        }
        setShowConfirmDelete(false)
        setItemToDelete(null)
    }

    const tableColumns = [...columns]

    if (canEdit || canDelete) {
        tableColumns.push({
            key: 'actions',
            header: 'Acciones',
            render: (_, row) => (
                <div className="d-flex gap-1">
                    {canEdit && (
                        <Button size="sm" variant="outline-primary" onClick={() => handleEdit(row)}>
                            Editar
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteClick(row)} // <-- Llama a la nueva función
                        >
                            Eliminar
                        </Button>
                    )}
                </div>
            ),
        })
    }

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Heading level={2} className="h4 m-0">{title}</Heading>
                {canCreate && (
                    <Button variant="success" onClick={handleCreate}>
                        {labels.create ?? 'Crear Nuevo'}
                    </Button>
                )}
            </div>

            <Table columns={tableColumns} rows={rows} rowKey={idKey} striped hover responsive />

            {/* Modal de Crear/Editar */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar' : 'Crear'} Registro</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {fields.map((f) => (
                            <FormField
                                key={f.name}
                                id={f.name}
                                name={f.name}
                                label={f.label}
                                type={f.type || 'text'}
                                options={f.options}
                                value={formData[f.name] || ''}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required={f.required}
                            />
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">Guardar</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* NUEVO Modal de Eliminación (Usando props) */}
            <ConfirmModal
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Registro"
                message="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
                variant="danger"
                confirmText="Sí, eliminar"
            />
        </div>
    )
}