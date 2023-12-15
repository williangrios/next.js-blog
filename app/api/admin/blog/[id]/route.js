import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "../../../../../models/blog";

export async function PUT(request, context) {
    await dbConnect()
    const _req = await request.json()
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(context.params.id, _req, {
            ..._req
        }, {
            new: true
        })
        return NextResponse.json(updatedBlog, {status: 200})
    } catch (error) {
        return NextResponse.json({
            err: 'An error occoured'
        }, {
            status: 500
        })
    }
}

export async function DELETE(request, context) {
    await dbConnect()
    const _req = await request.json()
    try {
        const deletedBlog = await Blog.findByIdAndDelete(context.params.id)
        return NextResponse.json(deletedBlog, {status: 200})
    } catch (error) {
        return NextResponse.json({
            err: 'An error occoured'
        }, {
            status: 500
        })
    }
}