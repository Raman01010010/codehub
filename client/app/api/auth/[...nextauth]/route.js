import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
//console.log(process.env.CLIENT_SECRET)
import { connectToDatabase } from '@utils/db'
import User from '@models/User'
const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,

        })
    ],
   callbacks:{ async session({ session }) {

    const user = await User.findOne({ email: session.user.email })
    session.user.id = user._id.toString()
    return session
},
async signIn({ profile }) {
    try {
        await connectToDatabase()
        const user = await User.findOne({ email: profile.email })
        if (!user) {
            await User.create({
                username: profile.name.replace(" ", "").toLowerCase(),
                email: profile.email,
                image: profile.picture,

            })
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}}
})

export { handler as GET, handler as POST }