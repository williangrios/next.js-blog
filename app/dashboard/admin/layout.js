import Link from "next/link";
import React from "react";

function AdminLayout({children}) {
  return (
    <>
      <nav className="nav justify-content-center">
        <Link href="/dashboard/admin" className="nav-link">
          Admin
        </Link>
        <Link href="/dashboard/admin/blog/create" className="nav-link">
          Create Blog
        </Link>
        <Link href="/dashboard/admin/blog/list" className="nav-link">
          Blogs list
        </Link>
      </nav>
      {children}
    </>
  );
}

export default AdminLayout;
