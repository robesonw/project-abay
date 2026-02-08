import { Command } from "commander";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run } from "../lib/exec.js";

function repoRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(__filename), "../../../");
}

export function downCommand(program: Command) {
  program
    .command("down")
    .description("Stop local runtime (Supabase Docker Compose).")
    .action(async () => {
      const vendor = path.join(repoRoot(), "runtime", "supabase", "vendor");
      await run("docker", ["compose", "--env-file", ".env", "-f", "docker-compose.yml", "down"], { cwd: vendor });
      console.log("[abay] Runtime stopped.");
    });
}
