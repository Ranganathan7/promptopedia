import { connectToDb } from "../../../../utils/database.connection";
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "../../../../models/user.schema";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        await connectToDb();
        // if user already exist
        const userExist = await UserModel.findOne({ email: user.email });
        // if user not found
        if (!userExist) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
