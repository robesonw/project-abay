import { Command } from "commander";

export function generateCommand(program: Command) {
  program
    .command("generate")
    .description("Generate app code from AppSpec (stub - Phase 3).")
    .action(async () => {
      console.log("[abay] generate is not implemented yet (Phase 3).");
      console.log("[abay] Next: deterministic generator templates (Next.js + migrations).");
    });
}
