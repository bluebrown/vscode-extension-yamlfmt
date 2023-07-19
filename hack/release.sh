#!/usr/bin/env bash
set -o nounset -o errexit -o errtrace -o pipefail

# get the next version
version="$(npm run --silent convco -- version --bump)"

# create a temporary git tag
git tag -m 'release' -a "v$version"

# generate a changelog
npm run --silent convco -- changelog --output CHANGELOG.md

# bump the version in the package.json
npm version --allow-same-version --no-git-tag-version "$version"

# create release commit and git tag pointing to it
git add .
git commit -sm "chore(release): v$version"
git tag --force -m 'release' -a "v$version"

# push the release commit with tags
git push --atomic origin "$(git rev-parse --abbrev-ref HEAD)" "v$version"

# create a release on github, pointing to the tag
res="$(curl -fsSL \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/bluebrown/vscode-extension-yamlfmt/releases \
  -d '{ "tag_name":"v'"$version"'", "generate_release_notes": true }')"

# create vsix artefact
npm run package

# and attach it to the github release
curl -fsSL \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -H "Content-Type: application/octet-stream" \
  "https://uploads.github.com/repos/bluebrown/vscode-extension-yamlfmt/releases/$(echo "$res" | jq -r '.id')/assets?name=yamlfmt-$version.vsix" \
  --data-binary "@yamlfmt-$version.vsix" >/dev/null

# publish the extension
npm run publish -- --no-update-package-json "$version"
