import path from "node:path";
import fs from "node:fs";

export function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

export function resolveProjectDir(projectDirArg?: string) {
  const projectDir = projectDirArg ? path.resolve(projectDirArg) : process.cwd();
  return projectDir;
}
