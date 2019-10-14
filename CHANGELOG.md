# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

