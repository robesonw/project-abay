import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { ensureDir, resolveProjectDir } from "../lib/path.js";

const DEFAULT_APPSPEC = {
  app: { name: "My Abay App", slug: "my-abay-app", version: "0.1.0", description: "" },
  runtime: { type: "supabase", tenancy: { model: "shared-db", tenantIdField: "tenant_id" } },
  security: { auth: { provider: "supabase" }, rbac: { roles: ["admin", "user"] } },
  data: { entities: [] },
  ui: { pages: [] },
  workflows: [],
  audit: { enabled: true, events: ["create", "update", "delete"] }
};

export function initCommand(program: Command) {
  program
    .command("init")
    .argument("[projectDir]", "Directory to initialize (default: current dir)")
    .description("Initialize a Project Abay app project (creates appspec + runtime folders).")
    .action(async (projectDirArg?: string) => {
      const projectDir = resolveProjectDir(projectDirArg);
      ensureDir(projectDir);

      const appspecPath = path.join(projectDir, "appspec.yaml");
      if (!fs.existsSync(appspecPath)) {
        fs.writeFileSync(appspecPath, yaml.dump(DEFAULT_APPSPEC, { noRefs: true }), "utf-8");
        console.log(`[abay] Created ${appspecPath}`);
      } else {
        console.log(`[abay] appspec.yaml already exists; leaving as-is.`);
      }

      const runtimeDir = path.join(projectDir, "runtime");
      ensureDir(runtimeDir);

      // Copy runtime bootstrapper files from repo runtime/ into project runtime/
      // We keep it simple: create a minimal pointer file and instruct user to run from monorepo for now.
      // Next milestone: embed runtime pack into generated project.
      const marker = path.join(runtimeDir, "README.md");
      if (!fs.existsSync(marker)) {
        fs.writeFileSync(
          marker,
          "# Runtime\n\n" +
          "This project expects Project Abay runtime helpers. Run `abay up` from the monorepo or copy `runtime/` folder.\n",
          "utf-8"
        );
      }

      console.log("[abay] Init complete.");
    });
}
