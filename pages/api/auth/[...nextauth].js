// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  // Add any additional configurations as needed
});
