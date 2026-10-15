import { Form } from 'react-bootstrap';


function SelectField({
    label,
    value,
    onChange,
    controlId,
    options = [],
    placeholder = 'Seleccione una opción',
}) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Select value={value} onChange={onChange}>
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}


export default SelectField;
