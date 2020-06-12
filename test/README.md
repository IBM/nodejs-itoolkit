# Node.js Toolkit Tests

Ensure dependencies are installed by running `npm install` from the project root.

## Running Tests

- Run unit tests with `npm test`.

- Run functional tests with `npm run test-integration`.

***NOTE***

Integration tests require additional setup and configuration. Some tests require objects to preexist on the IBM i. The test case will check if the object exists and log instructions if the object is not found.

## [Setup Rest interface](https://nodejs-itoolkit.readthedocs.io/en/latest/Connection.html#rest)

## [Setup SSH interface](https://nodejs-itoolkit.readthedocs.io/en/latest/Connection.html#ssh)

## Configuring Tests

Functional tests can be configured using the following enviornment variables.

- `TKTRANSPORT` - The transport to use. Defaults to use `ssh`.

- `TKVERBOSE`- Enables verbose output.

- `TKHOST` - The hostname. Defaults to `localhost`.

- `TKUSER` - The user to connect as.

- `TKPASS` - The user's password.

- `TKDB` - The database to connect to. Defaults to `*LOCAL`.

- `TKPORT` - The port to use to connect.

- `TKPATH` - The path to xmlcgi. Defaults to `/cgi-bin/xmlcgi.pgm`

- `TKURL` - The url to the xmlcgi endpoint.

- `TKPK` - The path to a private key file when using `ssh` transport.

- `TKPHRASE` - The passphrase to decrypt the private key.

