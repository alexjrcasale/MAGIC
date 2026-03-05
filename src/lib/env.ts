const required = ["DATABASE_URL", "NEXTAUTH_SECRET"] as const;

export function validateEnv(env = process.env): void {
  const missing = required.filter((k) => !env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}
