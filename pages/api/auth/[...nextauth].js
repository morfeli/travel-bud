import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  connectToDatabase,
  comparePasswords,
} from "../../../components/helper-functions/HelperFunctions";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client
          .db("morfeli-travelbud")
          .collection("users");

        const user = await userCollection.findOne({
          email: credentials?.email,
        });

        const userInfo = {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          userName: user?.userName,
          objectId: user?._id,
        };
        if (!user) {
          client.close();

          throw new Error("No user found!");
        }

        const isValid = await comparePasswords(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();

          console.log(`Credentials not valid`);

          throw new Error("Invalid password");
        }

        client.close();

        if (user) {
          return {
            name: userInfo,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token;
      }

      return session;
    },
  },
  secret: "MUNKNATION",
});
