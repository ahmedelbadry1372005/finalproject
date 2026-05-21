import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "fresh cart",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials) return null

          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })

          const data = await res.json()
          console.log("LOGIN RESPONSE:", data)

          if (res.ok && data.message === "success") {
            return {
              id: data.user._id,
              email: data.user.email,
              name: data.user.name,
              accessToken: data.token || "",
            }
          }

          return null
        } catch (error) {
          console.error("AUTH ERROR:", error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken
      }
      return token
    },

    async session({ session, token }) {
      
      session.user = {
        ...(session.user || {}),   
        accessToken: token.accessToken as string,
      }
      return session
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}