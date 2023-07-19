const Mocha = require("mocha");
const path = require("node:path");

function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    timeout: 1000 * 60 * 10,
  });

  const testsRoot = path.resolve(__dirname, "..");

  return new Promise((resolve, reject) => {
    // add the test in this particular order.
    // this is so that first the workspace is opened,
    // and then the files without causing extra window reloads
    mocha.addFile(path.resolve(testsRoot, "suite", "workspace.test.js"));
    mocha.addFile(path.resolve(testsRoot, "suite", "files.test.js"));

    try {
      // Run the mocha test
      mocha.run(failures => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }

  });
}

module.exports = {
  run
};
