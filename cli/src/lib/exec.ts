import { execa } from "execa";

export async function run(cmd: string, args: string[], opts?: { cwd?: string }) {
  const subprocess = execa(cmd, args, { stdio: "inherit", cwd: opts?.cwd });
  await subprocess;
}
