import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: "", content: "" });
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Decode token to get user info (simplified)
  useEffect(() => {
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("🧍 USER ID FROM TOKEN:", payload.sub);
    setUser(payload.sub);
  }
}, [token]);


  useEffect(() => {
  API.get(`/api/books/${id}/`)
    .then(res => {
      console.log("📘 BOOK DATA:", res.data);
      setBook(res.data);
    })
    .catch(err => console.error("Error loading book:", err));
}, [id]);


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/api/books/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Book deleted.");
        navigate("/books");
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("Failed to delete book.");
      }
    }
  };

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to leave a review.");
      return;
    }

    try {
      await API.post(
        `/api/books/${id}/reviews/`,
        {
          rating: parseInt(reviewForm.rating, 10),
          content: reviewForm.content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await API.get(`/api/books/${id}/`);
      setBook(res.data);
      setReviewForm({ rating: "", content: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error adding review.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>

        {/* Show edit/delete only if current user owns the book */}
        {user && Number(user) === Number(book.owner_id) && (
      <div className="mt- d-flex gap-3">
        <button
          className="btn btn-outline-success shadow-sm fw-semibold"
          style={{
            borderRadius: "12px",
            borderWidth: "2px",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.05px",
            backgroundColor: "#ff1e9",
          }}
        
          onClick={() => navigate(`/books/${id}/edit`)}
        >
          Edit Book
        </button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          Delete Book
        </button>
      </div>
)}



      <hr />
      <h4>Reviews</h4>
      {book.reviews?.length ? (
        <ul className="list-group">
          {book.reviews.map((r) => (
            <li key={r.id} className="list-group-item">
              <strong>{r.user}</strong> rated {r.rating}/5
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      {token && (
        <div className="mt-4">
          <h5>Add a Review</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                value={reviewForm.rating}
                onChange={handleChange}
                className="form-control"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="mb-3">
              <label>Review</label>
              <textarea
                name="content"
                value={reviewForm.content}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>
            <button className="btn btn-success">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookDetail;

