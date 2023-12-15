
import dbConnect from '../../../../utils/dbConnect';
import { NextResponse } from "next/server";
import Blog from '../../../../models/blog';
import queryString from 'query-string'

export async function GET(request, context) {
    await dbConnect()
    try {
        const blog = await Blog.findOne({slug: context.params.slug}).populate('postedBy', 'name')
        return NextResponse.json(blog, {status: 200})
    } catch (error) {
        return NextResponse.json({

        }, {
            status:500
        })
    }
}