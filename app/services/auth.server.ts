import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { sessionStorage } from '~/services/sessions.server';

export const authenticator = new Authenticator(sessionStorage)
// Login with Google
let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    callbackURL: `https://spiral-tawny.vercel.app/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return profile
  },
)
authenticator.use(googleStrategy)