"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
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
    <main className="page">
      <div className="nav">
        <div className="brand">ChannelNeg</div>
        <div className="nav-links">
          <button className="button ghost" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>

      <section className="card stack">
        <h2>Welcome, {session.username}</h2>
        <p className="small">Session role: {session.role}</p>
      </section>

      <section className="grid" style={{ marginTop: 14 }}>
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
    </main>
  );
}
