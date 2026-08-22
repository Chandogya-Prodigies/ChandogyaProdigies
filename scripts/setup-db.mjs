import { spawnSync } from "child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const steps = [
  ["run", "db:generate"],
  ["run", "db:bootstrap"],
  ["run", "db:seed:admin"],
  ["run", "db:seed:courses"],
];

for (const args of steps) {
  const command = `${npmCommand} ${args.join(" ")}`;
  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    if (result.error) {
      console.error(result.error);
    }
    console.error(`Database setup failed at: ${command}`);
    process.exit(result.status ?? 1);
  }
}
