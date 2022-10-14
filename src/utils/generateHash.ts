import { createHash } from "crypto";

export function generateHash(value: string) {
  const hash = createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
}
