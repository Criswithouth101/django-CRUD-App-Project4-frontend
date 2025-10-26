import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: "", content: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/api/books/${id}/`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Error loading book:", err));
  }, [id]);

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
      await API.post(`/api/books/${id}/reviews/`, reviewForm, {
        rating: parseInt(reviewForm.rating, 10),
        content: reviewForm.content,
        }, {
        headers: { Authorization: `Bearer ${token}` }
        });

      // reload reviews
      const res = await API.get(`/api/books/${id}/`);
      setBook(res.data);
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

      <hr />
      <h4>Reviews</h4>
      {book.reviews && book.reviews.length > 0 ? (
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
            <button className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
