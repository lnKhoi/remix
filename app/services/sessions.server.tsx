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
    clientID: '463266305530-ctq3htprdauqbp5qnrmkmdrcnife3mih.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: `https://spiral-tawny.vercel.app/auth/google/callback`,
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
