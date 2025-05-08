import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (user.status !== 200) {
          throw new Error("Invalid credentials");
        }

        const userData = await user.json();

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // return user object with their profile data
        return {
          firstName: "Ante",
          lastName: "Horvat",
          semester: 5,
          study: "Information Technology",
          mail: "ahorvat@unizd.hr",
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login?invalidLogin=1",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});
