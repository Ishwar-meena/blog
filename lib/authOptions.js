import connectDB from "@/db/connectDB";
import User from "@/models/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            await connectDB();
            const dbUser = await User.findOne({ email: user.email });
            // check user exist or not
            if (!dbUser) {
                await User.create({
                    email: user.email,
                    username: user.name,
                    avatar: user.image
                });
            }
            return true;
        },
        async session({ session }) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.id = dbUser._id.toString();
            }
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
}