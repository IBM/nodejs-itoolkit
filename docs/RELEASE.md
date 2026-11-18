# Release Process

Releases follow a two-phase flow: one or more **release candidates (RC)** are
published first, then the **final release** is cut once the RC is validated.

---

## Phase 1 - Release Candidate

### 1. Bump the version to an RC

Run `npm version` with the exact RC version string.  The first RC for a given
release is always `.0`; bump the trailing number for every subsequent RC.

```sh
# Examples
npm version 1.2.0-rc.0 --no-git-tag-version
npm version 1.2.0-rc.1 --no-git-tag-version   # if another RC is needed
```

`--no-git-tag-version` keeps `npm version` from creating the commit and tag -
those are done manually in the next steps.

### 2. Commit the version bump

```sh
git add package.json package-lock.json
git commit -m "chore: release v$(node -p "require('./package.json').version")"
```

### 3. Create and push the RC tag

Tags must follow the `v*.*.*` pattern (the publish workflow is triggered by
this pattern).

```sh
git tag v$(node -p "require('./package.json').version")
git push origin main
git push origin v$(node -p "require('./package.json').version")
```

Pushing the tag triggers the [publish workflow](../.github/workflows/publish.yml),
which creates a GitHub pre-release and publishes the package to npm under the
`rc` dist-tag.

---

## Phase 2 - Final Release

### 1. Copy the auto-generated changelog from GitHub

After the RC tag is pushed, GitHub auto-generates release notes for that tag.
Open the draft/pre-release on GitHub, copy the generated notes, and paste them
as a new entry at the top of [`CHANGELOG.md`](../CHANGELOG.md).

### 2. Bump the version to the final release

```sh
npm version <major|minor|patch> --no-git-tag-version
# e.g. npm version 1.2.0 --no-git-tag-version
```

### 3. Commit the release

```sh
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release v$(node -p "require('./package.json').version")"
```

### 4. Create the final tag

```sh
git tag v$(node -p "require('./package.json').version")
```

### 5. Push the branch and tag

```sh
git push origin main
git push origin v$(node -p "require('./package.json').version")
```

Pushing the tag triggers the [publish workflow](../.github/workflows/publish.yml),
which creates the GitHub release and publishes the package to npm.
