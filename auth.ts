import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Extend the User type to include our custom fields
interface ExtendedUser extends User {
  accessToken: string;
}

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
        const res = await fetch(
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

        if (res.status !== 200) {
          throw new Error("Invalid credentials");
        }

        const resp = await res.json();

        const userData = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/fetchMe`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resp.accessToken}`,
            },
          }
        );

        if (userData.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        const userDataResp = await userData.json();

        return {
          accessToken: resp.accessToken,
          ...userDataResp,
        };
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
    async jwt({ token, user }) {
      if (user) {
        // When signing in, merge the user data (including access token) into the token
        return {
          ...token,
          accessToken: (user as ExtendedUser).accessToken,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Add the access token to the session
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
});
