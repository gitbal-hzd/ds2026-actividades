import { existsSync } from "node:fs";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd(), "");
const dentroDeDocker = existsSync("/.dockerenv");
const databaseUrl = dentroDeDocker
  ? env.DATABASE_URL
  : env.DATABASE_URL?.replace("@db:", "@localhost:");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL: databaseUrl ?? "postgresql://postgres:postgres@localhost:5432/libreria_db",
    },
  },
});
