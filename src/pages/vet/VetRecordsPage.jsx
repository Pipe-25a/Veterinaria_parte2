import { useState, useEffect } from 'react'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CrudSection } from '../../components/organisms/CrudSection'
import { getVetRecords, saveVetRecords } from '../../services/vetService'
import { validateVetRecord } from '../../utils/validationVet'
import { usePageTitle } from '../../hooks/usePageTitle'

export function VetRecordsPage(props) {
    usePageTitle('Gestión de Fichas Clínicas')
    const [records, setRecords] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (props.initialRecords || props.records) {
            setRecords(props.initialRecords || props.records)
        } else {
            setRecords(getVetRecords())
        }
    }, [props.initialRecords, props.records])

    const COLUMNS = [
        { key: 'pet', header: 'Mascota' },
        { key: 'species', header: 'Especie' },
        { key: 'dueno', header: 'Dueño' },
        { key: 'breed', header: 'Raza' },
        {
            key: 'age',
            header: 'Edad',
            render: (v) => (v !== '' && v !== undefined && v !== null ? `${v} años` : '-'),
        },
    ]

    const FIELDS = [
        { name: 'pet', label: 'Mascota', required: true },
        { name: 'dueno', label: 'Dueño', required: true },
        {
            name: 'species',
            label: 'Especie',
            required: true,
            options: [
                { value: 'Perro', label: 'Perro' },
                { value: 'Gato', label: 'Gato' },
                { value: 'Otro', label: 'Otro' },
            ],
        },
        { name: 'breed', label: 'Raza' },
        { name: 'age', label: 'Edad (años)', type: 'number' },
        { name: 'weight', label: 'Peso (kg)', type: 'number' },
        {
            name: 'condition',
            label: 'Condición',
            required: true,
            options: [
                { value: 'Saludable', label: 'Saludable' },
                { value: 'En tratamiento', label: 'En tratamiento' },
            ],
        },
        { name: 'notes', label: 'Observaciones', as: 'textarea' },
    ]

    const handleCreate = (data) => {
        const { errors, isValid } = validateVetRecord(data)
        if (!isValid) {
            setError(Object.values(errors)[0])
            return
        }
        setError('')
        const newRecords = [...records, { id: Date.now(), ...data }]
        setRecords(newRecords)
        saveVetRecords(newRecords)
    }

    const handleUpdate = (id, data) => {
        const { errors, isValid } = validateVetRecord(data)
        if (!isValid) {
            setError(Object.values(errors)[0])
            return
        }
        setError('')
        const newRecords = records.map((r) => (r.id === id ? { ...r, ...data } : r))
        setRecords(newRecords)
        saveVetRecords(newRecords)
    }

    const handleDelete = (id) => {
        const newRecords = records.filter((r) => r.id !== id)
        setRecords(newRecords)
        saveVetRecords(newRecords)
    }

    return (
        <CatalogTemplate
            title={props.title ?? 'Gestión de Fichas Clínicas'}
            subtitle={props.subtitle ?? 'Administra las fichas de tus pacientes.'}
        >
            {error && <div className="alert alert-danger">{error}</div>}
            <CrudSection
                title="Pacientes registrados"
                columns={COLUMNS}
                rows={records}
                fields={FIELDS}
                actions={['create', 'edit', 'delete']}
                labels={{ create: 'Nueva Ficha' }}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </CatalogTemplate>
    )
}