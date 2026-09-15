// Work around sphinx-js / asdf version manager issue
// https://github.com/pyodide/sphinx-js/issues/316
//
// asdf creates a bash script shim for jsdoc but sphinx-js calls jsdoc through
// `node path/to/jsdoc ...`, which causes the following error
//
// /home/docs/.asdf/shims/jsdoc:2
// # asdf-plugin: nodejs 26.4.0
// ^
// SyntaxError: Invalid or unexpected token
//
// We work around this by creating this jsdoc JS script which can be called directly
// with node which finds the actual jsdoc command and calls it with all its args.

const process = require('node:process');
const fs = require('fs');

for (const path of process.env.PATH.split(':')) {
    const jsdoc = path + '/' + 'jsdoc';
    if (fs.existsSync(jsdoc)) {
        const args = [jsdoc].concat(process.argv.slice(2));

        process.execve(jsdoc, args);
    }
}

console.error("Can't find jsdoc command");
process.exit(1);
