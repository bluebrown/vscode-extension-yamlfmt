const path = require("path");
const os = require("os");
const fs = require("fs");

const { runTests } = require("@vscode/test-electron");

const projectConfigPath = ".yamlfmt";
const backupConfigPath = `${projectConfigPath}.bak`;

async function main() {
  fs.renameSync(projectConfigPath, backupConfigPath);

  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../");

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--user-data-dir", path.join(os.tmpdir(), "yamlfmt-test")],
    });

  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }

  fs.renameSync(backupConfigPath, projectConfigPath);
}

main();
