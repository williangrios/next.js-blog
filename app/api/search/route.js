import dbConnect from "@/utils/dbConnect";
import Blog from '@/models/blog'
import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET(request) {
    await dbConnect()
    const {searchQuery} = queryString.parseUrl(req.url).query
    try {
        const blogs = await Blog.find({
            $or: [
                // i means case insensitive
                {title: { $regex: searchQuery, $options: 'i'}},
                {content: { $regex: searchQuery, $options: 'i'}},
                {category: { $regex: searchQuery, $options: 'i'}}
            ]
        }).sort({createdAt: -1})
        return NextResponse.json(blogs, {status: 200})
    } catch (error) {
        return NextResponse.json(err, {status: 500})
    }

}