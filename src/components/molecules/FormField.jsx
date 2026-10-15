import Label from "../atoms/Label";
import TextField from "../atoms/TextField";
import Select from "../atoms/Select";

// Molécula: Label + (TextField o Select) + mensaje de error.
// Si recibe props.options muestra un Select; si no, un TextField.
function FormField(props) {
    const isInvalid = Boolean(props.error);

    return (
        <div className="mb-3">
            <Label htmlFor={props.id} text={props.label} />
            {props.options ? (
                <Select
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    options={props.options}
                    placeholder={props.placeholder}
                    isInvalid={isInvalid}
                />
            ) : (
                <TextField
                    id={props.id}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    min={props.min}
                    isInvalid={isInvalid}
                />
            )}
            {isInvalid && <div className="invalid-feedback">{props.error}</div>}
        </div>
    );
}

export default FormField;