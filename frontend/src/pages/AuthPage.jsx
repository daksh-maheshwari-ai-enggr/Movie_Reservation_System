import { useState } from "react";
import Field from "../components/Field.jsx";
import { call } from "../utils/api.js";

export default function AuthPage({ onDone, setPage }) {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await call("/auth/" + (register ? "register" : "login"), {
        method: "POST",
        body: JSON.stringify(form),
      });
      onDone(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="auth">
      <form className="card" onSubmit={submit}>
        <h1>{register ? "Create Account" : "Sign In"}</h1>
        <div className="switch">
          <button
            type="button"
            className={!register ? "active" : ""}
            onClick={() => setRegister(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={register ? "active" : ""}
            onClick={() => setRegister(true)}
          >
            Register
          </button>
        </div>
        {register && (
          <Field
            label="Full name"
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          />
        )}
        <Field
          label="Email address"
          type="email"
          value={form.email}
          onChange={(value) => setForm({ ...form, email: value })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
        />
        {!register && (
          <div className="demo">
            <b>Demo accounts — password: demo1234</b>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  email: "member@cinevault.demo",
                  password: "demo1234",
                })
              }
            >
              Member — Alex Rivera
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  email: "admin@cinevault.demo",
                  password: "demo1234",
                })
              }
            >
              Admin — Morgan Adeyemi
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button className="gold wide">
          {register ? "Create Account" : "Sign In"}
        </button>
        <button type="button" className="link" onClick={() => setPage("films")}> 
          Cancel
        </button>
      </form>
    </main>
  );
}
