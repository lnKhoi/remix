import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { sessionStorage } from '~/services/sessions.server';

export const authenticator = new Authenticator(sessionStorage)
// Login with Google
let googleStrategy = new GoogleStrategy(
  {
    clientID: '463266305530-ctq3htprdauqbp5qnrmkmdrcnife3mih.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `https://spiral-tawny.vercel.app/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return profile
  },
)
authenticator.use(googleStrategy)
