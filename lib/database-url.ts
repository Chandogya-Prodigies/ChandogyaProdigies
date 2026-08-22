import path from "path";

export function getDatabaseUrl() {
  const configuredUrl = process.env.DATABASE_URL;

  if (configuredUrl?.startsWith("file:")) {
    const filePath = configuredUrl.slice("file:".length);

    if (path.isAbsolute(filePath)) {
      return configuredUrl;
    }

    return `file:${path
      .resolve(/* turbopackIgnore: true */ process.cwd(), filePath)
      .replaceAll(path.sep, "/")}`;
  }

  return (
    configuredUrl ??
    `file:${path
      .resolve(/* turbopackIgnore: true */ process.cwd(), "prisma", "dev.db")
      .replaceAll(path.sep, "/")}`
  );
}
