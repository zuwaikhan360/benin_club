import clientPromise from '@/utils/mongoose';
import { connectDB } from '@/utils/mongoose';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from '@/utils/auth';
import User, { IUser } from '@/models/user.model';
import { JWT } from 'next-auth/jwt';

type Token = {
  user: IUser;
  // other token properties
} & JWT;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        await connectDB();
        const user = await User.findOne({
          $or: [{ email: credentials.email }, { memberId: credentials.email }],
        });

        if (!user) {
          throw new Error('Invalid email & password 2');
        }
        const isPasswordCorrect = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid email & password');
        }
        user.password = undefined;

        return user;
      },
    }),
  ],
  debug: process.env.NEXT_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, session, user, account, profile }) {
      if (trigger === 'signIn') {
        if (user) {
          token.user = user as unknown as IUser;
        }
      }
      if (trigger === 'update' && session) {
        const disallowedKeys = [
          'memberId',
          'subcriptionFee',
          'subcriptionBal',
          'entryFeePayment',
          'entryFeeBal',
          'status',
          'level',
          'joinDate',
          'password',
          'position',
          'verificationToken',
          'role',
          // 'signupStep',
          'wallet',
          'nameOfBankers',
        ];
        Object.keys(session).forEach((key) => {
          const value = session[key];
          if (!disallowedKeys.includes(key) && value !== '') {
            (token as Token).user[key] = value;
          }
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as IUser;
      return session;
    },
  },
  pages: { signIn: '/auth/signin' },
};

export default NextAuth(authOptions);
