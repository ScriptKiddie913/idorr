"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const opsMetrics = [
    { label: "Readiness Index", value: "92", unit: "%", trend: "+3" },
    { label: "Supply Continuity", value: "88", unit: "%", trend: "+1" },
    { label: "Comms Integrity", value: "99.7", unit: "%", trend: "+0.2" },
    { label: "Training Compliance", value: "94", unit: "%", trend: "+4" }
  ];

  const sectors = [
    { zone: "North Relay", status: "Stable", readiness: 96 },
    { zone: "River Bastion", status: "Monitoring", readiness: 83 },
    { zone: "South Transit", status: "Stable", readiness: 91 },
    { zone: "Eastern Watch", status: "Delayed", readiness: 74 }
  ];

  const events = [
    "Rotational staffing synchronized with logistics channels.",
    "Archive sync completed for personnel manifest version 4.2.",
    "Encrypted endpoint audit completed with no drift detected.",
    "Regional support request queue normalized below alert threshold."
  ];

  const router = useRouter();
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("channelneg-token");
    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadSession() {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeItem("channelneg-token");
        setError("Session is invalid. Please sign in again.");
        return;
      }

      const data = await response.json();
      setSession(data.user);
    }

    loadSession();
  }, [router]);

  function signOut() {
    localStorage.removeItem("channelneg-token");
    router.push("/login");
  }

  if (!session) {
    return (
      <main className="page">
        <section className="card">{error || "Loading dashboard..."}</section>
      </main>
    );
  }

  return (
    <main className="page dashboard-page">
      <div className="nav">
        <div className="brand">ILF Command Grid</div>
        <div className="nav-links">
          <button className="button ghost" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>

      <section className="card stack glow-card">
        <span className="badge">Authenticated Command Session</span>
        <h2>Welcome, Commander {session.username}</h2>
        <p className="small">Session role: {session.role}</p>
        <div className="metric-grid">
          {opsMetrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <p className="metric-label">{metric.label}</p>
              <h3 className="metric-value">
                {metric.value}
                <span className="metric-unit">{metric.unit}</span>
              </h3>
              <p className="small">Trend: {metric.trend}%</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-2col" style={{ marginTop: 14 }}>
        <div className="card stack">
          <div className="panel-heading">
            <h3>Sector Status Matrix</h3>
            <span className="badge">Readiness</span>
          </div>

          <div className="stack">
            {sectors.map((sector) => (
              <div className="line-item spread" key={sector.zone}>
                <div className="stack compact">
                  <strong>{sector.zone}</strong>
                  <p className="small">State: {sector.status}</p>
                </div>
                <div className="progress-pill">
                  <span>{sector.readiness}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card stack">
          <h3>My Workspace</h3>
          <p className="small">Access your account profile and current metadata.</p>
          <Link className="button" href={`/profile/${session.sub}`}>
            Open My Profile
          </Link>
        </div>

        <div className="card stack">
          <h3>Admin Console</h3>
          <p className="small">User directory and account control pane.</p>
          <Link className="button" href="/admin">
            Open Admin Console
          </Link>
        </div>
      </section>

      <section className="card stack" style={{ marginTop: 14 }}>
        <div className="panel-heading">
          <h3>Operational Timeline</h3>
          <span className="badge">Last 6 Hours</span>
        </div>
        <div className="timeline">
          {events.map((event, idx) => (
            <div className="timeline-item" key={event}>
              <div className="timeline-time">T-{(idx + 1) * 30}m</div>
              <p className="small">{event}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
