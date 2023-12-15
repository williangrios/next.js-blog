
import CredentialsProvider from "next-auth/providers";
import User from '@/models/user'
import bcrypt from 'bcrypt'
import dbConnect from '@/utils/dbConnect'
import Google from 'next-auth/providers/google'

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                dbConnect()
                const {email, password} = credentials
                const user = await User.findOne({email})
                if (!user){
                    throw new Error('Invalid email or password')
                }
                if (!user.password){
                    throw new Error('Please login via the method you used to signup')
                }
                const isPasswordMatched = await bcrypt.compare(password, user.password)
                if (!isPasswordMatched){
                    throw new Error('Invalid email or password')
                }
                return user
            }
        })
    ],
    callbacks: {
        // create or update user if they login via social networds
        async signIn({user}) {
            dbConnect()
            const {email} = user
            let dbUser = await User.create({email})
            if (!dbUser) {
                dbUser = await new User({
                    name: user.name,
                    email: user.email,
                    image: user.image
                })
            }
            return true
        },
        // we'll use callbacks to add additional user info to the session (jwt, session)
        jwt: async ({token, user}) => {
            const userByEmail = await User.findOne({email: token.email})
            userByEmail.password = undefined
            token.user = userByEmail
            return token
        },
        session: async ({session, token}) => {
            session.user = token.user
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}