import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function LoginForm({ onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="Correo"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormField
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p role="alert">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}