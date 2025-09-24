import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedAdmins = process.env.ADMIN_EMAILS?.split(",") || [];

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],
   callbacks: {
      async signIn({ user }) {
         // Restrict only to allowed admins
         if (user.email && allowedAdmins.includes(user.email)) {
            return true;
         }
         return false;
      },
      async jwt({ token, user }) {
         if (user?.email && allowedAdmins.includes(user.email)) {
            token.role = "admin";
         }
         return token;
      },
      async session({ session, token }) {
         if (token?.role) {
            session.user.role = token.role;
         }
         return session;
      },
   },
   secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
