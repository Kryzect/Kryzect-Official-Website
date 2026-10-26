// Node 24 loads private local configuration without a browser-facing dotenv dependency.
export function loadLocalEnvironment() {
  for (const file of ['.env.local', '.env']) {
    try {
      process.loadEnvFile(file)
    } catch (error) {
      if (error.code !== 'ENOENT')
        throw new Error(
          `Unable to parse ${file}; check its local configuration.`,
        )
    }
  }
}
