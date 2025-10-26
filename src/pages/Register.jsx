import { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error creating account");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
export default Register;
