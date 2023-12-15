"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function AdminBlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      try {
        setLoading(true);
        const response = await fetch(process.env.CLOUDINARY_API_BASE_URL, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setImage(data.secure_url);
        }
      } catch (error) {
        toast.error('An error occoured.')
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/blog`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content, category, image})
        })
        if (response.ok){
            router.push('/dashboard/admin')
            toast.success('Blog created successfully')
        } else {
            const errorData = await response.JSON()
            toast.error(errorData.err)
        }
    } catch (error) {
        toast.error('An error occoured.')
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead">Create Blog</p>
          <label className="text-secondary">Blog title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control p-2 my-2"
          />
          <label className="text-secondary">Blog content</label>
          <ReactQuill
            className="border rounded my-2"
            value={content}
            onChange={(e) => setContent(e)}
          />
          <label className="text-secondary">Blog Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control p-2 my-2"
          />

          {image && (
            <img src={image} alt="image preview" style={{ width: "100px" }} />
          )}

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-secondary">
              <label htmlFor="upload-button" className="mt-2 pointer">
                {loading ? "Uploading...." : "Upload images"}
              </label>
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                onChange={uploadImage}
                hidden
              />
            </button>
            <button
              className="btn bg-primary text-light"
              disabled={loading}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogCreate;
