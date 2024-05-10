# Maintainer Notes

## Tests

The test suit requires runs in electron and therefore some system packages are
required to support GUI apps. The easiest way to get everything required is to
install google-chrome, since electron uses chromium under the hood. On WSL2 this
can be done by following [these instructions](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps#install-google-chrome-for-linux).

> **Note** The very first test run, after populating .vscode-test, always fails.
> Afterwards the tests work as expected.

## Releases

in order to create a release, you need to export two environment variables
first:

- `VSCE_PAT` -- Azure Devops PAT. [See the Docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)
- `GITHUB_TOKEN` -- Github token with read/write permissions on content

Once the environ variables are set, you can run `npm run release`, to create a
new github release and publish the extension to azure marketplace.
