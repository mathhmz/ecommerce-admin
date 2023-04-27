import clientPromise from '@/pages/api/auth/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'




export default NextAuth({

  secret: process.env.SECRET,
  providers: [


    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }),

  ],

  adapter: MongoDBAdapter(clientPromise),


})