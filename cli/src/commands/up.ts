import { Command } from "commander";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { resolveProjectDir } from "../lib/path.js";
import { run } from "../lib/exec.js";

function repoRoot(): string {
  // This CLI lives in /cli, and runtime folder sits at ../runtime
  const __filename = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(__filename), "../../../");
}

export function upCommand(program: Command) {
  program
    .command("up")
    .argument("[projectDir]", "App project directory (default: current dir)")
    .description("Start local runtime (Supabase Docker Compose) for the project.")
    .action(async (projectDirArg?: string) => {
      const projectDir = resolveProjectDir(projectDirArg);
      const rt = path.join(repoRoot(), "runtime", "supabase");
      const bootstrap = path.join(rt, "bootstrap.sh");
      if (!fs.existsSync(bootstrap)) {
        throw new Error(`Missing runtime bootstrap at ${bootstrap}`);
      }

      // Bootstrap vendor compose/env
      // Use relative path since cwd is set to rt
      await run("bash", ["bootstrap.sh"], { cwd: rt });

      const vendor = path.join(rt, "vendor");
      console.log(`[abay] Starting Supabase stack from ${vendor}`);
      await run("docker", ["compose", "--env-file", ".env", "-f", "docker-compose.yml", "up", "-d"], { cwd: vendor });

      console.log("[abay] Runtime is up. Supabase Studio typically at http://localhost:8000");
      console.log(`[abay] Project dir: ${projectDir}`);
    });
}
