import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

/**
* Signs a JWT token with the given payload and options.
 * @param payload 
 * @param option 
 * @returns 
 */
export function signJwt(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_USER_ID_SECRET!;
  const token = jwt.sign(payload, secretKey);
  return token;
}

/**
 * Verifies a JWT token and returns the payload.
 * @param token 
 * @returns 
 */
export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (e) {
    console.log(e);
    return null;
  }
}