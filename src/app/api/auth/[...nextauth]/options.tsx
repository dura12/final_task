import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { signIn } from "next-auth/react";


export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          if (!res.ok) {
            return null;
          }
      
          const user = await res.json();
          console.log(user.data)
          if (user) {
            // console.log("User Exists:", user);
            return {
              id: user.data.id,
              name: user.data.name,
              email: user.data.email,
              accessToken: user.data.accessToken,
              refreshToken: user.data.refreshToken
            };
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      
        return null;
      }
})
      
  ],

  callbacks: {
    async signIn({user}){
      return true 
    },
    async jwt({ token, user  , session}) {
      token = {
        ...token,
        ...user
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session=  {
        ...session,
        ...token
      }
      console.log(session)
      return session;
    },
  },
};
