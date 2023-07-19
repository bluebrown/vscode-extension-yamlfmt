const fs = require("node:fs");
const path = require("node:path");
const vscode = require("vscode");
const { before } = require("mocha");
const { sleep, caseDirTest } = require("./lib");

suite("workspace", () => {
  const casesDir = path.join(__dirname, "testdata", "workspace");
  const testCases = fs.readdirSync(casesDir).filter(entry => fs.statSync(path.join(casesDir, entry)).isDirectory());

  before(async () => {
    vscode.workspace.updateWorkspaceFolders(0, null, ...testCases.map(tc => ({ uri: vscode.Uri.file(path.join(casesDir, tc)) })));
    await sleep(5000);
  });

  for (const tc of testCases) {
    test(tc, async () => {
      const wsf = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(path.join(casesDir, tc)));
      await caseDirTest(wsf.uri.fsPath);
    })
  }

});

