import { useState } from 'react'
import { Table } from '../atoms/Tables'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { FormField } from '../molecules/FormField'
import { Modal } from 'react-bootstrap' 

export function CrudSection(props) {
    const { title, columns, rows, idKey = 'id', fields = [], actions = [], labels = {}, onCreate, onUpdate, onDelete } = props
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    // Abrir modal para crear
    const handleCreate = () => {
        setFormData({})
        setIsEditing(false)
        setShow(true)
    }

    // Abrir modal para editar
    const handleEdit = (row) => {
        setFormData(row)
        setIsEditing(true)
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        isEditing ? onUpdate(formData[idKey], formData) : onCreate(formData)
        setShow(false)
    }

    // Botones de acción en la tabla
    const tableColumns = [
        ...columns,
        {
            key: 'actions',
            header: 'Acciones',
            render: (_, row) => (
                <div className="d-flex gap-1">
                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(row)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => window.confirm('¿Eliminar?') && onDelete(row[idKey])}>Eliminar</Button>
                </div>
            ),
        },
    ]

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Heading level={2} className="h4 m-0">{title}</Heading>
                <Button variant="success" onClick={handleCreate}>{labels.create ?? 'Crear Nuevo'}</Button>
            </div>

            <Table columns={tableColumns} rows={rows} rowKey={idKey} striped hover responsive />

            {/* Modal de Bootstrap (Mucho más corto) */}
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
        </div>
    )
}