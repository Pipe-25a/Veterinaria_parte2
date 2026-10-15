import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function RegisterForm({ onSubmit, error, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField id="name" label="Nombre" value={form.name} onChange={handleChange} required />
      <FormField id="email" label="Correo" type="email" value={form.email} onChange={handleChange} required />
      <FormField id="password" label="Contraseña" type="password" value={form.password} onChange={handleChange} required />
      <FormField id="confirmPassword" label="Confirmar contraseña" type="password" value={form.confirmPassword} onChange={handleChange} required />
      {error && <p role="alert">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
}