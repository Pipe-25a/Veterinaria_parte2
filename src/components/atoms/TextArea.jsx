import {Form} from 'react-bootstrap';

function TextArea({
    label,
    placeholder,
    value,
    onChange,
    controlId,
    rows = 3,
    required = false,
    minLenght,
    maxLenght,
}) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                minLenght={minLenght}
                maxLenght={maxLenght}
            />
        </Form.Group>
    );
}

export default TextArea