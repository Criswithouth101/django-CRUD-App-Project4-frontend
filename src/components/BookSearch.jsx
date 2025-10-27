import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  // Fetch books (with optional URL for pagination)
  const fetchBooks = async (url = `/api/books/?search=${query}`) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setBooks(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

 useEffect(() => {
  console.log("Search query changed:", query); 

  const delayDebounce = setTimeout(() => {
    fetchBooks(`/api/books/?search=${query}`);
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [query]);


  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="text"
        placeholder="🔍 Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading && <p className="text-gray-500 mt-2">Loading...</p>}

      <ul className="mt-4 space-y-2">
        {books && books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="p-3 bg-white rounded shadow-sm">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">{book.description}</p>
            </li>
          ))
        ) : (
          !loading &&
          query && (
            <p className="text-gray-500 mt-4">No books found for "{query}".</p>
          )
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        {prevPage ? (
          <button
            onClick={() => fetchBooks(prevPage)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ⬅ Previous
          </button>
        ) : (
          <div />
        )}
        {nextPage && (
          <button
            onClick={() => fetchBooks(nextPage)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next ➡
          </button>
        )}
      </div>
    </div>
  );
}
