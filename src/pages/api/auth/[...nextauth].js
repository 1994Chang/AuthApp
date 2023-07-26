import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from '../../../../database/conn';
import Users from '../../../../model/Schema';
import { compare } from 'bcryptjs';

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
          name:"Credentials",
          async authorize(credentials,req){
            connectMongo().catch(error => {error :"Connection Failed....!"})

            //check user existance
            const result = await Users.findOne({email:credentials.email})
            if(!result){
              throw new Error("No user Found with Email Please Sign Up....")
            }

            //compare user 
            const checkPassword = await compare(credentials.password, result.password);
            if(!checkPassword || result.email !== credentials.email){
              throw new Error("Username of Password Dosen`t Match")
            }
            return result;
          }
        })
      ]
})