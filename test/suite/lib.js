const path = require("node:path");
const vscode = require("vscode");
const assert = require("assert");
const util = require("node:util");

const sleep = util.promisify(setTimeout);

/**
 * Run tests against a case dir. The dir should contain at least 2 files:
 * input.yaml and result.yaml. The input.yaml files content is copied to a
 * temporary file and then that temp file is formatted. The formatted files
 * content is compared against the result.yaml file.
 *
 * Depending whether the dir is part of a workspace, the yamlfmt extension might
 * behave differently. For example reading a .yamlfmt or .vscode/settings.json.
 *
 * The env variable XDG_CONFIG_HOME is always set to  dirPath/xdg-config-home.
 * This allows placing a global config file there for yamlfmt to read
 * @param {string} dirPath absolute path to test case directory
 */
async function caseDirTest(dirPath) {
  process.env.XDG_CONFIG_HOME = path.join(dirPath, "xdg-config-home");

  const give = (await vscode.workspace.openTextDocument(vscode.Uri.file(path.join(dirPath, "input.yaml")))).getText();
  const want = (await vscode.workspace.openTextDocument(vscode.Uri.file(path.join(dirPath, "result.yaml")))).getText();

  // construct the uri for the temporary test document
  const testDocUri = vscode.Uri.file(path.join(dirPath, "test.yaml"));

  // create the test file and add the give contents to it
  const edit = new vscode.WorkspaceEdit();
  edit.createFile(testDocUri, { ignoreIfExists: true, overwrite: true, contents: new TextEncoder().encode(give) });
  await vscode.workspace.applyEdit(edit);

  // get the document and save the edits
  const doc = await vscode.workspace.openTextDocument(testDocUri);
  await doc.save();

  // open the document, format it and save it
  await vscode.window.showTextDocument(doc);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  await doc.save();

  // check if give == wants
  assert.deepEqual(doc.getText(), want);
}

module.exports = {
  sleep,
  caseDirTest,
};
