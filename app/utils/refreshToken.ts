// utils/refreshToken.ts
import axios from 'axios';

export async function refreshAccessToken(refreshToken: string) {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  });

  return response.data;
}
