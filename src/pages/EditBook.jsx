import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", description: "", price: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/api/books/${id}/`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Error loading book:", err));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/books/${id}/`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book updated successfully!");
      navigate(`/books/${id}`);
    } catch (err) {
      console.error("Error updating book:", err);
      alert("Failed to update book.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" value={book.description} onChange={handleChange} className="form-control" required></textarea>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" step="0.01" name="price" value={book.price} onChange={handleChange} className="form-control" required />
        </div>
        <button className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBook;
