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

/*
// Átomo: campo de varias líneas (motivo de la cita, observaciones).
export function Textarea(props) {
  const rows = props.rows ?? 3
  const invalid = props.invalid ?? false
  const disabled = props.disabled ?? false
  const required = props.required ?? false
  const className = props.className ?? ''

  const classes = ['form-control', invalid && 'is-invalid', className]
    .filter(Boolean)
    .join(' ')

  return (
    <textarea
      id={props.id}
      name={props.name}
      rows={rows}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      disabled={disabled}
      required={required}
      className={classes}
      aria-invalid={invalid}
    />
  )
}
  */