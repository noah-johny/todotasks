import crypto from "crypto";
import { app } from "../server";

const getSalt = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const hashPassword = (password: string) => {
  const salt = getSalt();
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { hash, salt };
};

export function verifyPassword(password: string, hash: string, salt: string) {
  const verifyCandidateHash = crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    "sha512"
  );
  return hash === verifyCandidateHash.toString("hex");
}

export const generateTokens = (user: any) => {
  const accessToken = app.jwt.sign(user, { expiresIn: "15m" });
  const refreshToken = app.jwt.sign(user, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};
