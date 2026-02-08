import { Command } from "commander";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run } from "../lib/exec.js";

function repoRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(__filename), "../../../");
}

export function statusCommand(program: Command) {
  program
    .command("status")
    .description("Show runtime container status.")
    .action(async () => {
      const vendor = path.join(repoRoot(), "runtime", "supabase", "vendor");
      await run("docker", ["compose", "-f", "docker-compose.yml", "ps"], { cwd: vendor });
    });
}
