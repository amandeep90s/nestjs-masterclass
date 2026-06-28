export interface IJwtPayload {
  sub: number; // User ID
  email: string; // User email
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  aud: string; // Audience
  iss: string; // Issuer
}
