import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { createThemeSessionResolver } from 'remix-themes';

import { createCookieSessionStorage } from '@remix-run/cloudflare';

const isProduction = process.env.NODE_ENV === "production";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30days
    sameSite: "lax",
    secrets: ["s3cr3t"],
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

export const authenticator = new Authenticator(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: import.meta.env.GOOGLE_OAUTH_CLIENT_ID ,
    clientSecret: import.meta.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: `${import.meta.env.BASE_URL}/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return {
      accessToken,
      refreshToken,
      profile
    }
  }
);

authenticator.use(googleStrategy);

export let { getSession, commitSession, destroySession } = sessionStorage;