"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

async function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(data.success);
        router.push('/login')
      }
    } catch (error) {
      toast.error("An error occoured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center align-items-center vh-100">
        <div className="col-lg-5 bg-light p-5 shadow">
          <p className="lead">Register</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter your name"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter your email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter your password"
            />
            <button
              className="btn btn-primary"
              disabled={loading || !name || !email || !password}
            >
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
