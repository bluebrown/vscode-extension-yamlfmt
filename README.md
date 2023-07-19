# VS Code Extension - yamlfmt

This extension calls the external binary [yamlfmt][1].

## Usage

> **Note** The binary must exist in the system path. See the [official install
> instructions][2].

### Configuration

The binary is invoked with the [workspace folder][3], containing the document to
format, as `cwd`. So the [official documentation][4], regarding `yamlfmt`
configuration, applies.

If the file is not opened from a workspace, the extension will fallback to the
files parent directory as `cwd`. If that is not sufficient to pick up the right
config file, you can create a .yamlfmt at one of the common locations. i.e.
`~/config/yamlfmt/` or export `XDG_CONFIG_HOME`. Alternatively point to the
right at via the `-conf` flag, in your `settings.json`.

You can pass [extra flags][5] from the `settings.json`:

```json
{
  "yamlfmt.args": []
}
```

> **Note** The flag `-in` is always appended to the args, since the current
> document is passed via stdin to yamlfmt.

## Contribution

Read the [maintainer notes][6] for more info.

[1]: https://github.com/google/yamlfmt
[2]: https://github.com/google/yamlfmt#installation
[3]: https://code.visualstudio.com/docs/editor/workspaces
[4]: https://github.com/google/yamlfmt/blob/main/docs/config-file.md
[5]: https://github.com/google/yamlfmt/blob/main/docs/command-usage.md#operation-flags
[6]: https://github.com/bluebrown/vscode-extension-yamlfmt/blob/main/MAINTAINER.md
