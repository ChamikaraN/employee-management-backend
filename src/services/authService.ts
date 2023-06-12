import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  [key: string]: any;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Service function for generating access token and refresh token
export function generateTokens(): TokenResponse {
  const accessToken = generateToken(
    {},
    process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME!
  );
  const refreshToken = generateToken(
    {},
    process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME!
  );

  return { accessToken, refreshToken };
}

// Service function for generating a token
function generateToken(payload: TokenPayload, expiresIn: string): string {
  const secretKey: Secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secretKey, { expiresIn });
}

// Service function for refreshing an access token
export function refreshAccessToken(refreshToken: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_SECRET!, (err) => {
      if (err) {
        reject(err);
      } else {
        const accessToken = generateToken(
          {},
          process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME!
        );
        resolve(accessToken);
      }
    });
  });
}
