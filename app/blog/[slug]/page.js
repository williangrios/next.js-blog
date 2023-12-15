import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

async function getBlog(slug) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
}

async function BlogViewPage({ params }) {
  const blog = await getBlog(params.slug);

  return (
    <div className="container mb-5">
      <div className="card">
        <div style={{ height: "300px", overflow: "hidden" }}>
          <img
            src={blog?.image || "/images/default-blog.jpg"}
            alt={blog.title}
            className="card-img-top"
            style={{ objectFit: "cover", height: "100%", widows: "100%" }}
          />
        </div>
        <div className="card-body">
        <h5 className="card-title">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h5>
        <div className="card-text">
            <div dangerouslySetInnerHTML={{
                __html: blog.content
            }}></div>
        </div>
        <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">Category: {blog.category}</small>
            <small className="text-muted">Author: {blog.postedBy?.name || 'Admin'}</small>
        </div>
        {/* <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">Posted: {dayjs(blog.createdAt).fromNow()}</small>
        </div> */}
      </div>
      </div>
    </div>
  );
}

export default BlogViewPage;
