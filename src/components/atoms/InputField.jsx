import { Form } from 'react-bootstrap';

function InputField({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    controlId,
}) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Form.Group>
    );
}

export default InputField