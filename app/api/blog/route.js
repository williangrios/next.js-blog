import dbConnect from '../../../utils/dbConnect';
import { NextResponse } from "next/server";
import Blog from '../../../models/blog';
import queryString from 'query-string'

export async function GET(request){
    await dbConnect()
    const searchParams = queryString.parseUrl(request.url).query
    const {page} = searchParams || 1
    const pageSize = 10

    try {
        const currentPage = Number(page) || 1
        const skip = (currentPage - 1) * pageSize
        const totalBlogs = await Blog.countDocuments({})
        const blogs = await Blog.find({}).populate('postedBy', 'name').skip(skip).limit(pageSize).sort({createdAt: -1})
        return NextResponse.json({blogs, currentPage, totalPages: Math.ceil(totalBlogs/pageSize)}, {status: 200})

    } catch (error) {
        return NextResponse.json({
            err: 'An error occoured'
        }, {
            status: 500
        })
    }
}