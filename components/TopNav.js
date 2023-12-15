import Link from "next/link";
import React from "react";
import { useSession, signOut, signOut } from "next-auth/react";
import { useSearch } from "../context/search";

function TopNav() {
  const { data, status } = useSession();
  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">
        BLOG
      </Link>
      <form className="d-flex mb-0" role="search" onSubmit={fetchSearchResults}>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button className="btn">&#128270</button>
      </form>
      {status === "authenticated" ? (
        <>
          <div className="d-flex">
            <Link
              className="nav-link"
              href={`/dashboard/${
                data?.user?.role === "admin" ? "admin" : "user"
              }`}
            >
              {data?.user?.name} ({data?.user?.role})
            </Link>
            <a
              className="nav-link pointer"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <Link className="nav-link" href="/login">
            Login
          </Link>
          <Link className="nav-link" href="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default TopNav;
