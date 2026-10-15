import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FormField({ id, label, ...inputProps }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} {...inputProps} />
    </div>
  );
}