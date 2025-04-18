import * as Jwt from "npm:jsonwebtoken"; // https://www.npmjs.com/package/jsonwebtoken

// TODO: Generate on first time startup and save to disk
const privateKey = "sadljhdsadsaldsahdsaldsas";

export function createJWT(userId: string): string {
  const jwt = Jwt.sign({ user: userId }, privateKey, {
    // algorithm: "RS256", // TODO: Implement me
    expiresIn: "1h",
  });
  return jwt;
}

/** If the token is valid the user ID is returned */
export function verifyJWT(token: string): string | undefined {
  try {
    const result = Jwt.verify(token, privateKey);
    return result.user;
  } catch (e) {
    console.log("Validation error:", e);
    return undefined;
  }
}
