import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { upCommand } from "./commands/up.js";
import { downCommand } from "./commands/down.js";
import { statusCommand } from "./commands/status.js";
import { promptCommand } from "./commands/prompt.js";
import { generateCommand } from "./commands/generate.js";

const program = new Command();

program
  .name("abay")
  .description("Project Abay CLI (working name) - spec-first, local-first SaaS compiler.")
  .version("0.0.1");

initCommand(program);
promptCommand(program);
generateCommand(program);
upCommand(program);
downCommand(program);
statusCommand(program);

program.parse(process.argv);
