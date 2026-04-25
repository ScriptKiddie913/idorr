import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="nav">
        <div className="brand">ChannelNeg</div>
        <div className="nav-links">
          <Link className="button ghost" href="/login">
            Sign In
          </Link>
        </div>
      </div>

      <section className="hero card">
        <h1>Identity Operations Portal</h1>
        <p>
          Internal workspace for profile lifecycle, account lookup, and access channel monitoring.
        </p>
        <div className="grid">
          <div className="card">
            <h3>Unified Access</h3>
            <p className="small">Session-based gateway for employee profile and role resolution.</p>
          </div>
          <div className="card">
            <h3>Account Registry</h3>
            <p className="small">Centrally indexed user records with profile metadata.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
