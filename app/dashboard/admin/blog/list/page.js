import Link from "next/link";

async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };
  const searchQuery = new URLSearchParams(urlParams).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/blog?${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      next: { revalidate: 1 },
    }
  );
  if (!response.ok) {
    throw new Error("Failet to fetch blogs");
  }
  const data = await response.json();
  return data;
}

export default async function AdminBlogsList({ searchParams }) {
  const data = await getBlogs(searchParams);
  const { blogs, currentPage, totalPages } = data;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="container">
      <p className="lead text-primary text-center">Latest blogs</p>
      {blogs.map((blog) => (
        <div key={blog._id} className="d-flex justify-content-between">
          <p>{blog.title}</p>
          <Link
            className="text-danger"
            href={`/dashboard/admin/blog/update/${blog.slug}`}
          >
            Update
          </Link>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`?page=${currentPage - 1}`}
                >
                  Previous
                </Link>
              </li>
            )}
            {hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`?page=${currentPage + 1}`}
                >
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
