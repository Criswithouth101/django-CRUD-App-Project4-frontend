
export default function Home() {
  return (
    <div className="container-narrow mt-5">
      <div className="paper-card">
        <h1 className="mb-3">Welcome to <span style={{color: 'var(--primary)'}}>The Literaalley</span></h1>
        <p className="lead">An alley full of books — where stories live and readers wander.</p>
        <a className="btn btn-accent mt-2" href="/books">Browse Books</a>
      </div>
    </div>
  );
}

