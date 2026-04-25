"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in");
      }

      localStorage.setItem("ilf-token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="nav">
        <Link href="/" className="brand">
          ILF
        </Link>
      </div>

      <section className="card" style={{ maxWidth: 460, margin: "0 auto" }}>
        <div className="stack" style={{ marginBottom: 14 }}>
          <h2>Sign in</h2>
          <p className="small">Use your account credentials to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="stack">
          <label className="stack small">
            Username
            <input
              className="input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="stack small">
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <div className="error small">{error}</div> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Enter Portal"}
          </button>
        </form>
      </section>
    </main>
  );
}
