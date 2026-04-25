"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ilf-token");
    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadProfile() {
      const response = await fetch(`/api/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to load profile");
        return;
      }

      setProfile(data.profile);
    }

    loadProfile();
  }, [params.id, router]);

  return (
    <main className="page">
      <div className="nav">
        <Link href="/dashboard" className="brand">
          ILF
        </Link>
        <div className="nav-links">
          <Link href="/dashboard" className="button ghost">
            Dashboard
          </Link>
          <Link href="/admin" className="button ghost">
            Admin
          </Link>
        </div>
      </div>

      <section className="card stack">
        <h2>Profile</h2>
        {error ? <div className="error">{error}</div> : null}

        {profile ? (
          <>
            <div className="badge">ID #{profile.id}</div>
            <div className="grid">
              <div className="card stack">
                <span className="small muted">Username</span>
                <strong>{profile.username}</strong>
              </div>
              <div className="card stack">
                <span className="small muted">Display Name</span>
                <strong>{profile.displayName}</strong>
              </div>
              <div className="card stack">
                <span className="small muted">Email</span>
                <strong>{profile.email}</strong>
              </div>
              <div className="card stack">
                <span className="small muted">Region</span>
                <strong>{profile.country}</strong>
              </div>
            </div>
            <div className="card stack">
              <span className="small muted">Profile Notes</span>
              <strong>{profile.bio}</strong>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
