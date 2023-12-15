import dbConnect from "@/utils/dbConnect";
import User from '@/models/user'
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request){
    const _req = await request.json()
    await dbConnect()
    try {
        const {name, email, password} = _req
        const existingUser = await User.findOne({email})
        if ({existingUser}){
            return NextResponse.json({
                err: 'Email already exists'
            }, {
                status: 409
            })
        } else {
            await new User({name, email, password: await bcrypt.hash(password, 10)}).save()
            return NextResponse.json({
                message: 'Registration successfull'
            }, {
                status: 200
            })
        }
    } catch (error) {
        return NextResponse.json({
            err: 'server error'
        }, {
            status: 500
        })
    }
}