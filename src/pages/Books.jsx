import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/api/books/")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error loading books:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="section-title">Books</h2>

      {books.length === 0 ? (
        <p>No books yet.</p>
      ) : (
        <div className="row g-3">
          {books.map(book => (
            <div key={book.id} className="col-md-6 col-lg-4">
              <div className="book-card h-100">
                <h5 className="mb-1">
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h5>
                <small className="text-muted">by {book.author}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
