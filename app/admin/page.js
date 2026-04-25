"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("ilf-token");
    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadUsers() {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Access denied");
        return;
      }

      setUsers(data.users);
    }

    loadUsers();
  }, [router]);

  return (
    <main className="page">
      <div className="nav">
        <Link href="/dashboard" className="brand">
          ILF
        </Link>
        <div className="nav-links">
          <Link href="/dashboard" className="button ghost">
            Back
          </Link>
        </div>
      </div>

      <section className="card stack">
        <h2>Admin Console</h2>
        <p className="small">Account registry and profile index.</p>
        {error ? <div className="error">{error}</div> : null}

        {users.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Region</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.country}</td>
                    <td>
                      <Link className="button ghost small" href={`/profile/${user.id}`}>
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  );
}
