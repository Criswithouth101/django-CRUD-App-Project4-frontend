import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/books/", form);
      alert("Book added!");
      navigate("/books");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("You must be logged in to add a book.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}
export default AddBook;
