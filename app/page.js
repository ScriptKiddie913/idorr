import Link from "next/link";

export default function HomePage() {
  const overview = [
    { label: "Active Sectors", value: "14", note: "2 under review" },
    { label: "Comms Uptime", value: "99.92%", note: "Last 24 hours" },
    { label: "Logistics Nodes", value: "37", note: "4 delayed" },
    { label: "Field Personnel", value: "1,284", note: "87 on rotation" }
  ];

  const priorities = [
    "Northern corridor supply reroute approved",
    "Encrypted channel migration at 82% completion",
    "Civil support relay queue reduced by 18%",
    "Night watch staffing fully balanced"
  ];

  return (
    <main className="page dashboard-page">
      <div className="nav">
        <div className="brand">ILF Command Grid</div>
        <div className="nav-links">
          <Link className="button ghost" href="/dashboard">
            Open Console
          </Link>
          <Link className="button ghost" href="/login">
            Sign In
          </Link>
        </div>
      </div>

      <section className="hero card glow-card">
        <span className="badge">Fictional Organization Interface</span>
        <h1>Irar Liberation Force Strategic Dashboard</h1>
        <p>
          High-level situational board for command readiness, logistics tracking, communication
          integrity, and member directory access.
        </p>
        <div className="metric-grid">
          {overview.map((item) => (
            <div className="metric-card" key={item.label}>
              <p className="metric-label">{item.label}</p>
              <h3 className="metric-value">{item.value}</h3>
              <p className="small">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-2col" style={{ marginTop: 16 }}>
        <div className="card stack glow-card">
          <div className="panel-heading">
            <h3>Priority Briefs</h3>
            <span className="badge">Live Feed</span>
          </div>
          <div className="stack">
            {priorities.map((item, index) => (
              <div className="line-item" key={item}>
                <span className="dot" />
                <p className="small">
                  B-{index + 11}: {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card stack">
          <h3>Command Access</h3>
          <p className="small">
            Enter the authenticated workspace for personnel records, admin directory controls, and
            profile operations.
          </p>
          <div className="stack" style={{ marginTop: 4 }}>
            <Link className="button" href="/dashboard">
              Enter Operations Console
            </Link>
            <Link className="button ghost" href="/login">
              Authenticate Session
            </Link>
          </div>
          <div className="status-strip">
            <span>Grid Health</span>
            <strong>Stable</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
