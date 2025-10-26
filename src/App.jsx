import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";
import BookDetail from "./pages/BookDetail";
import NavBar from "./components/NavBar"



function App() {

  return (
    <>
     < NavBar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookDetail />} />


          {/* Protected route 👇 */}
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
