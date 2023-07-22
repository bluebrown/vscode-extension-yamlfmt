const fs = require("node:fs");
const path = require("node:path");
const { caseDirTest } = require("./lib");
const { platform } = require("node:os");
const { window } = require("vscode");


suite("files", () => {
  const casesDir = path.join(__dirname, "testdata", "files");
  const testCases = fs.readdirSync(casesDir).filter(entry => fs.statSync(path.join(casesDir, entry)).isDirectory());

  for (const tc of testCases) {
    if (tc === "config-xdg" && platform() === "win32") {
      window.showInformationMessage("skipping XDG_CONFIG_HOME test due to windows platform!");
      continue;
    }

    test(tc, async () => {
      const dirPath = path.join(casesDir, tc);
      await caseDirTest(dirPath);
    });
  }

});
