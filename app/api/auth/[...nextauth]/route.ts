import { connectToDb } from "../../../../utils/database";
import NextAuth, { Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session ({ session }: { session: Session }) {
      return session;
    },
    async signIn ({ user }: { user: User }) {
      try {
        await connectToDb();

        return true;
      } catch(err) {
        console.log(err);
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST };

