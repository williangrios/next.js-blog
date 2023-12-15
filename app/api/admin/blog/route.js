import { NextResponse } from "next/server";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/utils/dbConnect";
import Blog from "../../../../models/blog";

export async function POST(request) {
  const _req = await request.json();
  await dbConnect();
  const { title, content, category, image } = _req;

  switch (true) {
    case !title:
      return NextResponse.json({ err: "Title is required" }, { status: 400 });
    case !content:
      return NextResponse.json({ err: "Content is required" }, { status: 400 });
    case !category:
      return NextResponse.json(
        { err: "Category is required" },
        { status: 400 }
      );
  }

  try {
    const existingBlog = await Blog.findOne({
      slug: slugify(title?.toLowerCase()),
    });
    if (existingBlog) {
      return NextResponse.json(
        {
          err: "Blog title is taken",
        },
        {
          status: 400,
        }
      );
    }
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const blog = await Blog.create({
      title,
      content,
      category,
      image: image ? image : null,
      postedBy: token.user._id,
      slug: slugify(title),
    });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
