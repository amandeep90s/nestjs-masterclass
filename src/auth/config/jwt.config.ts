import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  tokenAudience: process.env.JWT_TOKEN_AUDIENCE,
  tokenIssuer: process.env.JWT_TOKEN_ISSUER,
  accessTokenTtl: Number(process.env.JWT_ACCESS_TOKEN_TTL) || 3600,
  refreshTokenTtl: Number(process.env.JWT_REFRESH_TOKEN_TTL) || 86400,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
