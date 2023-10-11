# Changelog

## [1.0.2](https://github.com/IBM/nodejs-itoolkit/compare/v1.0.1...v1.0.2) (2023-10-11)

## [1.0.1](https://github.com/IBM/nodejs-itoolkit/compare/v1.0.0...v1.0.1) (2022-10-31)

- fix: Missing braces in README Example (#286)
- fix: Typo in ssh transport error message (#287)
- test: Remove redundant ProgramCall test (#284)
- test: Constrain eslint rules
- test: Fix eslint errors issues in eslintrc
- test: Configure tests to use Mocha env in eslintrc
- test: Adjust AirBnB rules for Mocha tests
- test: Use eslint-plugin-mocha for tests
- test: Remove arrow functions from mocha functions (#283)
- ci: Add eslint action (#244)
- docs: Update setup transport interface links (#292)
- fix: Emit deprecation warning for iPgm.addReturn (#295)
- build(deps-dev): bump standard-version from 7.1.0 to 8.0.1 (#299)
- build(deps): bump lodash from 4.17.15 to 4.17.19 (#302)
- chore: Unmark as stale if issue has been updated (#311)
- fix: Make exempt labels plural for stale action (#312)
- test: Check the XMLSERVICE version for QSH support (#303)
- fix: Update standard-version to resolve CVE-2020-8116 (#310)
- refactor: Handle optional dependencies better (#306)
- test: Fix mocha/no-identical-title eslint issue (#296)
- test: Fix mocha/no-hooks-for-single-case eslint issue (#297)
- fix: eslint GH action failure (#336)
- docs: Add comma to separate password and url key
- build(deps): Update deps to the latest version (#347)
- docs: Add omit as valid value for io (#346)
- docs: Reference alternate XML parser (#345)
- build: readthedocs build error (#349)
- build(deps): Add fast-xml-parser (#351)
- build(deps): Upgrade ssh2 to latest version (#355)
- fix: Better optional deps handling (#353)
- ci: Add npm publish action (#358)
- docs: Update cosine example to pass by value (#359)

## [1.0.0](https://github.com/IBM/nodejs-itoolkit/compare/1.0.0-alpha.1...1.0.0) (2020-05-08)


### ⚠ BREAKING CHANGES

* Remove iSql.connect() and iSql.setOptions()
* Remove iConn.setTimeout()

### Features

* Allow DS for service program return value ([#217](https://github.com/IBM/nodejs-itoolkit/issues/217)) ([30e9f8a](https://github.com/IBM/nodejs-itoolkit/commit/30e9f8a69da829935dcee72dbd394032feef0e27))
* Specify supported Node versions ([#264](https://github.com/IBM/nodejs-itoolkit/issues/264)) ([63ec53c](https://github.com/IBM/nodejs-itoolkit/commit/63ec53c0ac17e9d4130b79074a61075ce0ac897e))
* use standard-version [#85](https://github.com/IBM/nodejs-itoolkit/issues/85) ([45f66a7](https://github.com/IBM/nodejs-itoolkit/commit/45f66a7f9ac5b5d37c907f5d088cb517cd4d3d66))


### Bug Fixes

* Add missing '?' in xml prolog ([bff8649](https://github.com/IBM/nodejs-itoolkit/commit/bff864991f73f5789c5dec563821c86eb1aab3fa))
* data type issue in Toolkit.getSysStatus and Toolkit.getSysStatusExt ([#190](https://github.com/IBM/nodejs-itoolkit/issues/190)) ([15397c2](https://github.com/IBM/nodejs-itoolkit/commit/15397c279d51b9282ef948b7d61d7d403690ce6f))
* Define errno structure correctly ([#192](https://github.com/IBM/nodejs-itoolkit/issues/192)) ([b1561f7](https://github.com/IBM/nodejs-itoolkit/commit/b1561f76e5803409c485f8b965745a060462852b)), closes [#191](https://github.com/IBM/nodejs-itoolkit/issues/191)
* Deprecated functional tests rest transport options ([#255](https://github.com/IBM/nodejs-itoolkit/issues/255)) ([903dd3f](https://github.com/IBM/nodejs-itoolkit/commit/903dd3f70f635f37bb2abba4a61b5a99a4f16ba3))
* eslint errors ([#243](https://github.com/IBM/nodejs-itoolkit/issues/243)) ([df40eb0](https://github.com/IBM/nodejs-itoolkit/commit/df40eb0c4898214493b22b9054d9eea57e6bccd9))
* Faulty error thrown by ProgramCall.addParam ([#124](https://github.com/IBM/nodejs-itoolkit/issues/124)) ([75d081c](https://github.com/IBM/nodejs-itoolkit/commit/75d081c86ae35f0557ea7b5a1f8886018de6ff36))
* Formatting errors in bug report template ([24a9262](https://github.com/IBM/nodejs-itoolkit/commit/24a92626e97f407dc7de998e2c65d6500d289eaf))
* Homepage link in package.json ([#267](https://github.com/IBM/nodejs-itoolkit/issues/267)) ([d5787ce](https://github.com/IBM/nodejs-itoolkit/commit/d5787cef2ade2d8fa298986a73040158dd2b6f84))
* HTTP transport should take a URL ([#252](https://github.com/IBM/nodejs-itoolkit/issues/252)) ([34e4e37](https://github.com/IBM/nodejs-itoolkit/commit/34e4e3765667a6060d82bd6dabf2bcd4569aa765))
* iConn unit test failure ([52f0330](https://github.com/IBM/nodejs-itoolkit/commit/52f0330801a8b5bbdbac19af4ff60ee80927a9e3))
* iConn unit test failure ([#274](https://github.com/IBM/nodejs-itoolkit/issues/274)) ([9e72857](https://github.com/IBM/nodejs-itoolkit/commit/9e728572fcfd734059d3a09e6934760518183250))
* Improper TOC nesting in main README ([#175](https://github.com/IBM/nodejs-itoolkit/issues/175)) ([db5d44c](https://github.com/IBM/nodejs-itoolkit/commit/db5d44cdcc79dbded8d3fa6f0717ed268d5d7606))
* minimist CVE ([#231](https://github.com/IBM/nodejs-itoolkit/issues/231)) ([6d02c43](https://github.com/IBM/nodejs-itoolkit/commit/6d02c43c38cf3c5fcc2e5ee559ea123ba97b12f2))
* Move iConn compatibility code to iConn itself ([#218](https://github.com/IBM/nodejs-itoolkit/issues/218)) ([73d798d](https://github.com/IBM/nodejs-itoolkit/commit/73d798deaf1ca840d2c0d5742ded40712fe33955))
* ssh transport econnreset ([#272](https://github.com/IBM/nodejs-itoolkit/issues/272)) ([d5e71c1](https://github.com/IBM/nodejs-itoolkit/commit/d5e71c159319574a937ee415df4c636d7f347ba7))
* ssh transport silent failure ([#225](https://github.com/IBM/nodejs-itoolkit/issues/225)) ([6e3b8a0](https://github.com/IBM/nodejs-itoolkit/commit/6e3b8a0f11539ee04540cf12d97cd6b67b3ed967))
* Test hooks timeout when using rest transport ([#253](https://github.com/IBM/nodejs-itoolkit/issues/253)) ([60fdd5b](https://github.com/IBM/nodejs-itoolkit/commit/60fdd5b75ba165646d8f888344aa1924c39272b1))
* TODOs in Deprecated.js ([#240](https://github.com/IBM/nodejs-itoolkit/issues/240)) ([cd47476](https://github.com/IBM/nodejs-itoolkit/commit/cd474766d769d7832cf38fca40a5ed14b19f4bfa))
* **idb:** Improve cleanup handling ([#233](https://github.com/IBM/nodejs-itoolkit/issues/233)) ([c2bb115](https://github.com/IBM/nodejs-itoolkit/commit/c2bb1152e13785a975597da41d6ca7df94bf4c09))
* Use encodeURIComponent for URL params ([2c98b22](https://github.com/IBM/nodejs-itoolkit/commit/2c98b229148adbc3475d2eba1c1f397cd7367447)), closes [#72](https://github.com/IBM/nodejs-itoolkit/issues/72) [#71](https://github.com/IBM/nodejs-itoolkit/issues/71)


* Remove iConn.setTimeout() ([c978c41](https://github.com/IBM/nodejs-itoolkit/commit/c978c41ad28f5e4db152bd4bd5e56ba3824ea650))
* Remove iSql.connect() and iSql.setOptions() ([066e8ba](https://github.com/IBM/nodejs-itoolkit/commit/066e8ba43e0c68ff6165b4be8f1d00eac1242f38))

## [1.0.0-alpha.1](https://github.com/IBM/nodejs-itoolkit/compare/1.0.0-alpha.0...1.0.0-alpha.1) (2019-07-10)

### Bug Fixes

* Bump version to 1.0.0-alpha.1 ([a7b4770](https://github.com/IBM/nodejs-itoolkit/commit/a7b47704b4e564329288efad51d06fcd7d166609))

* Add check for connectError ([0ec197e](https://github.com/IBM/nodejs-itoolkit/commit/0ec197e37114c34857eb75edf4b86889c0fdfdd7))

* Use POST method for REST transport ([#65](https://github.com/IBM/nodejs-itoolkit/issues/65)) ([6a9f91f](https://github.com/IBM/nodejs-itoolkit/commit/6a9f91fc5b556a2991668a2fa64a4b321cb25bb2))

## [1.0.0-alpha.0](https://github.com/IBM/nodejs-itoolkit/compare/v0.1.6...1.0.0-alpha.0) (2019-06-27)

### ⚠ BREAKING CHANGES

 * Removed 'sync' logic from all the functions. Have all internal functions using ProgramCaller instead of xt.iPgm. Fixed eslint-disable sections, but there are a few that are still needed (bitwise operations) ([#32](https://github.com/IBM/nodejs-itoolkit/issues/32)) ([7fdf0fd](https://github.com/IBM/nodejs-itoolkit/commit/7fdf0fd5b530297699ac8ffc80f5cfaa18e1fc72))


* Remove setTimeout() method see issue ([#32](https://github.com/IBM/nodejs-itoolkit/issues/32)) We no longer support sync mode which had an option to set timeout ([ee3d048](https://github.com/IBM/nodejs-itoolkit/commit/ee3d048cd61842a29b9ad8a848c8439c9658c337))


### Features

* Rework Connection.js see issues ([#25](https://github.com/IBM/nodejs-itoolkit/issues/25)) ([#2](https://github.com/IBM/nodejs-itoolkit/issues/2)) ([4dcb183](https://github.com/IBM/nodejs-itoolkit/commit/4dcb183bda082e55a820528a2e741d6e622a94cd))

        Allow Connection.js Constructor to accept a single object see #25
        Allow Connection.run() function to return error as first param of callback see #2

* Add ssh transport ([5f1c803](https://github.com/IBM/nodejs-itoolkit/commit/5f1c803855a35de12c23c7b91778fc1716dc3a0a))

* Add odbc transport ([7956a15](https://github.com/IBM/nodejs-itoolkit/commit/7956a153dc5d0665a1fecc3d0fe77075719da9dc))

### Bug Fixes

* Patch SqlCall.js ([aa9591c](https://github.com/IBM/nodejs-itoolkit/commit/aa9591c24402dcca0fbcf750e6a77ded4f4dbd9d))

* **deps:** update with ssh2 and missing depd dependency ([45c1c57](https://github.com/IBM/nodejs-itoolkit/commit/45c1c5768750b05fd1f6c1ae2858070e4ba1ff77))

* **deps:** Update odbc dependency ([04bac84](https://github.com/IBM/nodejs-itoolkit/commit/04bac848bd902e70e07861905ff81aa2c6a453d6))

* Rework idb and rest transports ([#17](https://github.com/IBM/nodejs-itoolkit/issues/17)) ([6f2ddcd](https://github.com/IBM/nodejs-itoolkit/commit/6f2ddcda9be8ed0f9ad4e46af4bc7d6722fce707))

        Update transports interface to accept config, xmlInput, done

        idb transport

        Use iPLUGR512k variant instead of iPLUG512k to iterate over a result set

        Ensure conn and stmt are always cleaned up properly
        - even during error states the stmt and conn objects are now cleaned
        - add function clean() to avoid duplication
        - this commit should help resolve issue #17

        rest transport

        Validate required: database, username, password

        Enforce output buffer to be set to the max
        - before default was only set now output buffer is always set to the max

        Small fixes add mising semicolons, remove some comments, etc

### Tests

 * Added unit and functional tests ([163939c](https://github.com/IBM/nodejs-itoolkit/pull/38/commits/163939c6520d8a9b35e433699bdb8f9bdf0598a4))

 * Fixed some issues found during unit testing ([1f5421f](https://github.com/IBM/nodejs-itoolkit/pull/38/commits/1f5421fc3a080f337668d2ce01fbb912eb6ca9c6))

 * Move existing unit/functional tests to deprecated folder ([c7a875e](https://github.com/IBM/nodejs-itoolkit/commit/c7a875e1f090330d330a1928390043cc0a481140))

 * Update unit/functional tests ([c6c470d](https://github.com/IBM/nodejs-itoolkit/commit/c6c470d9d8c5ee185ac0db191d54f0f94b056e51))
 
 * Added ToolkitFunctional.js ([8aa1f56](https://github.com/IBM/nodejs-itoolkit/commit/8aa1f56c8a1ccffdb158ae280c9643bfed5e4104))
 
 * Rename unit/functional tests ([b8733bc](https://github.com/IBM/nodejs-itoolkit/commit/b8733bc5306747033d48430a41070c4efb9bcc9c))
 
 * Bump default timeout for tests from 2s -> 3s ([6ef2cb3](https://github.com/IBM/nodejs-itoolkit/commit/6ef2cb3754ba217280cd09daf7f99a1433421897))
 
 * Update configuration options in functional tests ([4ba0b8f](https://github.com/IBM/nodejs-itoolkit/commit/4ba0b8f1c8a278b8d948bd841bf6fe3ddb9c1172))
 
 * Add ssh to available transports also add verbose configuration ([15ec42d](https://github.com/IBM/nodejs-itoolkit/commit/15ec42dd1acbf0f613d6f56220c4277d1b0cbe82))
 
 * Add config for DSN ([8957bb4](https://github.com/IBM/nodejs-itoolkit/commit/8957bb4f469675427920622787786296be670ae9))

### Refactor

* Rename command.js -> CommandCall.js ([7c12d91](https://github.com/IBM/nodejs-itoolkit/commit/7c12d91ff009157caea954863d7c52a2d114a35f))

* Add CommandCall Class ([8884e7a](https://github.com/IBM/nodejs-itoolkit/commit/8884e7a15d4989e477b5386e097f98c00885bdc0))

        - class to maintain command types (sh, cl, qsh) see issue #24
        - merge (sh, cl, qsh) code into toXml
        - add in some JSDoc annotations

* Update Toolkit.js ([36492d2](https://github.com/IBM/nodejs-itoolkit/commit/36492d25a8e3d33b9275214b12767c07a3a13dc1))

        Add in checks for when returnError is false in Toolkit.js.
        This is case occurs when a call from deprecated class goes through
        Toolkit.js. Instead of worrying about setting the flag on and off
        create a new Connection object when same config when returnError is
        false within the constructor. Then have proper checks for when to report
        the error.

* Update Toolkit methods - Now all toolkit methods will have error first callbacks ([a632dbf](https://github.com/IBM/nodejs-itoolkit/commit/a632dbf1c99371771e47bd8922df9c75ce49f4b0))

* Move transports to lib/transports/ directory([8077fb7](https://github.com/IBM/nodejs-itoolkit/commit/8077fb70aec343c5cd5ed2e8c774d729bc43e1e7))

* Moving ALL deprecated functions into Deprecated.js They import the new classes and use them. Can be easily removed later. Also removed CommandGenerator class and just have 3 const functions exported ([d218b1d](https://github.com/IBM/nodejs-itoolkit/commit/d218b1d1e84844e841f2543d9f8687b6b96b76fd))

* Linted the tests, and made them use assert (before they only failed if the last object tested were not successful, and tracked success with a variable). Renamed the sql class to SqlCall. General cleanup ([a73d031](https://github.com/IBM/nodejs-itoolkit/commit/a73d03151ba2ce8272a00ba0b65b1e24b28529ff))

* Cut down and consolidated files. I think initial modularization was good, now building back up a little. icmd, iqsh, and ish are all mostly the same thing, and I made them live in the CommandGenerator class. Others, like iconn and isql, are definitely their own classes and rightly split off. I also put the deprecated classes into the file of the class that is replacing them to simplify the file structure. ([#24](https://github.com/IBM/nodejs-itoolkit/issues/24)) ([5e7b983](https://github.com/IBM/nodejs-itoolkit/issues/24))

* Creating 'Toolkit' class to hold all of the functions and stores the conn like the old classes. Keeping old classes but redirecting to toolkit and adding deprecation messages (todo) ([f8fc468](https://github.com/IBM/nodejs-itoolkit/commit/f8fc468d8d8bf2003ed105bd604a0c041d87b015))

* Consolidating 'classes' that serve no purpose into one file, now all functions that do the same type of work are together ([69d2825](https://github.com/IBM/nodejs-itoolkit/commit/69d282507797621565bc30a1bbcb1e4927f3697e))

* Modularize itoolkit.js ([#20](https://github.com/IBM/nodejs-itoolkit/issues/20)) ([35a2ffb](https://github.com/IBM/nodejs-itoolkit/commit/35a2ffb586300721127d93d8b64885d7aad6e84b))

* Getting rid of __getClass in itoolkit.js and places where it was imported ([f9812b7](https://github.com/IBM/nodejs-itoolkit/commit/5388b55dc0f0510b8f2570b6ea327d6853206fb1))

### Docs

* Add contribution guidelines ([89be160](https://github.com/IBM/nodejs-itoolkit/pull/38/commits/89be160344863dfd0509ea188cb1dc6d743625ad))

* Update Readme for v1.0.0  ([f51438e](https://github.com/IBM/nodejs-itoolkit/commit/f51438e21c1d1756f6105ec70b99f3aa22903c08))

* Update and Add SSH doc ([f7b8fd8](https://github.com/IBM/nodejs-itoolkit/commit/f7b8fd8d3c876765b9d8e027bb0816745dd9b18c))

* Add doc for odbc transport ([c0e80ff](https://github.com/IBM/nodejs-itoolkit/commit/c0e80ff110e48c8d51e1b95c65b82682150e0a99))

* Update install docs for alpha version  ([8e81232](https://github.com/IBM/nodejs-itoolkit/commit/8e812324de0630f1de04e87eb0ae339a77ec22a5))

### Style

* Fix lingering files with CRLF line endings CRLF -> LF ([b21636c](https://github.com/IBM/nodejs-itoolkit/commit/b21636c4398c8c242bad278a3901d23991dd4f97))

* Fix line endings CRLF -> LF ([0541748](https://github.com/IBM/nodejs-itoolkit/commit/0541748c7c04c3e44ae1b2138bc0a74236c03986))

* Removing some eslint-disable comments now that ProgramCall fits with required naming convention ([be5247c](https://github.com/IBM/nodejs-itoolkit/commit/be5247c8e2fcd66d6b4026930c3bd3a7c778453e))

* Lint xmlToJson function ([17ef86f](https://github.com/IBM/nodejs-itoolkit/commit/17ef86f987b1056c8e325d73edfd5c5bada88dcc))

* Linted the /lib directory using airbnb-base linting configuration ([#21](https://github.com/IBM/nodejs-itoolkit/issues/21)) ([5388b55](https://github.com/IBM/nodejs-itoolkit/commit/5388b55dc0f0510b8f2570b6ea327d6853206fb1))

### [0.1.6](https://github.com/IBM/nodejs-itoolkit/compare/0.1.5...0.1.6) (2019-01-25)

### [0.1.5](https://github.com/IBM/nodejs-itoolkit/compare/0.1.4...0.1.5) (2019-01-08)

### 0.1.4 (2018-09-17)
