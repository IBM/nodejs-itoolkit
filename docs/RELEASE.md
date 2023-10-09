# Release

To create a new release the developer first needs to run:

```sh
npm run release
```

This script will run [release-it](https://github.com/release-it/release-it) which will then prompt the user for the:

1) version
2) commit message
3) tag name (NOTE: Tag name should follow the pattern v*.*.*)

release-it should then:

- bump the version in the package.json and package-lock.json files
- update CHANGELOG.md
- make the release commit
- create the tag

From there the developer needs to:

1) Review the changes made by release-it are as expected.
2) Push the commit and tag to the main branch (requires proper authority)

```sh
git push --follow-tags origin master
```

Once the tag and commit is pushed to the main branch our [github action](../.github/workflows/publish.yml) will:

1) Create the GH release
2) Publish the release to NPM
