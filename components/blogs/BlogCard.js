import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function BlogCard({ blog }) {
  return (
    <div className="card mb-4">
      <div style={{ height: "200px", overflow: "hidden" }}>
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
                __html: blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content
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
  );
}

export default BlogCard;
