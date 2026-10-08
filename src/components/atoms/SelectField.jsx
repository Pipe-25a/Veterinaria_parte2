import {form} from 'react-bootstrap';

function SelectField({
    label,
    placeholder,
    value,
    onChange,
    options = [],
    controlId,
    required = false,
}){
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Select value={value} onChange={onChange} required={required}>
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((op) => (
                    <option key={op.value} value={op.value}>
                        {op.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );

}
export default SelectField