// /lib/token-helper.ts
//done 77: extend duration of FACEBOOK_ACCESS_TOKEN TINA CMS/BACKEND
export type StoredAccessToken = {
  accessToken: string;
  expiresAt: number; // UNIX timestamp in seconds
};

// Create a token from a fresh API response
export function createStoredToken(accessToken: string, expiresIn: number): StoredAccessToken {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + expiresIn;
  return {
    accessToken,
    expiresAt,
  };
}

// Load token from environment variables
export function loadTokenFromEnv(): StoredAccessToken | null {
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  const expiresAt = process.env.FACEBOOK_TOKEN_EXPIRES_AT;

  if (!token || !expiresAt) return null;

  return {
    accessToken: token,
    expiresAt: parseInt(expiresAt, 10),
  };
}

// Check if token is still valid
export function isTokenValid(token: StoredAccessToken): boolean {
  const now = Math.floor(Date.now() / 1000);
  return token.expiresAt > now;
}

// Get days left before expiration
export function daysUntilExpiration(token: StoredAccessToken): number {
  const now = Math.floor(Date.now() / 1000);
  const secondsLeft = token.expiresAt - now;
  return Math.floor(secondsLeft / (60 * 60 * 24));
}
