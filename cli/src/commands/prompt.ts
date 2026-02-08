import { Command } from "commander";

export function promptCommand(program: Command) {
  program
    .command("prompt")
    .argument("<text...>", "Prompt describing the app to generate")
    .description("Generate/repair AppSpec from a prompt (stub - Phase 2).")
    .action(async (text: string[]) => {
      console.log("[abay] prompt is not implemented yet (Phase 2).");
      console.log("[abay] You said:", text.join(" "));
      console.log("[abay] Next: implement AI provider abstraction + BYOK + AppSpec output.");
    });
}
