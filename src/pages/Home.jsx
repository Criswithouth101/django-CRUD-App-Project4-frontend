import logo from "../assets/the-Literaalley-logo.png";
import React from "react";
import BookSearch from "../components/BookSearch";

export default function Home() {
  return (
    <div className="container-narrow mt-5">
      <div className="paper-card">
        <h1 className="mb-3">Welcome to <span style={{color: 'var(--primary)'}}>The Literaalley</span></h1>
        <img
                    src={logo}
                    alt="The Literaalley logo"
                    height="50"
                    className="me-2 rounded"
                    style={{ objectFit: "contain" }}
                  />
        <p className="lead">An alley full of books — where stories live and readers wander.</p>
        <a className="btn btn-accent mt-2" href="/books">Public Book Alley</a>
        <div>
      <h1 className="text-2xl font-bold text-center mt-6 mb-4">
        Book Explorer 📚
      </h1>
      <BookSearch />
    </div>
      </div>
    </div>
  );
}

