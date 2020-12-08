function checkObjectExistsSSH(config, object = {}, callback) {
  // ssh2 is an optional dependency, since users may not use this transport
  // thus we can't globally require it
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const { Client } = require('ssh2');

  const client = new Client();
  const checkLibCommand = `system 'CHKOBJ OBJ(QSYS/${object.lib}) OBJTYPE(*LIB)'`;
  const checkObjectCommand = `system 'CHKOBJ OBJ(${object.lib}/${object.name}) OBJTYPE(${object.type})'`;

  // if client.connect has an error it will be handled here
  client.on('error', (error) => {
    callback(error, false);
  });

  client.on('ready', () => {
    client.exec(checkLibCommand, (checkLibError, checkLibStream) => {
      /* eslint-disable no-console */
      if (config.verbose) { console.log(`executing ${checkLibCommand}`); }
      if (checkLibError) {
        callback(checkLibError, false);
        return;
      }
      checkLibStream.stderr.on('data', (data) => {
        console.log(`STDERR: ${data}`);
      });
      checkLibStream.on('exit', (checkLibCode) => {
        if (checkLibCode !== 0) {
          if (config.verbose) { console.log(`Command exited abnormally with code: ${checkLibCode}`); }
          const libError = new Error(`${object.lib} lib was not found!\nCreate it by running: ${object.createLib}`);
          client.end();
          client.destroy();
          callback(libError, false);
          return;
        }
        client.exec(checkObjectCommand, (checkObjectError, checkObjectStream) => {
          if (config.verbose) { console.log(`executing ${checkObjectCommand}`); }
          if (checkObjectError) {
            client.end();
            client.destroy();
            callback(checkLibError, false);
            return;
          }
          checkObjectStream.stderr.on('data', (data) => {
            console.log(`STDERR: ${data}`);
          });
          checkObjectStream.on('exit', (checkObjectCode) => {
            if (checkObjectCode !== 0) {
              client.end();
              client.destroy();
              console.log(`Command exited abnormally with code: ${checkObjectCode}`);
              const objectError = new Error(`${object.name} was not found!\nCreate it by running: ${object.createObject}`);
              callback(objectError);
              return;
            }
            client.end();
            client.destroy();
            callback(null, true);
          });
        });
      });
    });
  });

  client.connect(config);
}

function checkObjectExistsODBC(config, object = {}, callback) {
  // odbc is an optional dependency, since users may not use this transport
  // thus we can't globally require it
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const odbc = require('odbc');

  const connectionString = config.dsn || `DRIVER=IBM i Access ODBC Driver;SYSTEM=${config.host};UID=${config.username};PWD=${config.password};`;

  odbc.connect(connectionString, (connectError, connection) => {
    if (connectError) {
      callback(connectError, false);
      return;
    }
    connection.query(object.findLib, (findLibError, libResult) => {
      if (findLibError) {
        callback(findLibError, false);
        return;
      }
      if (config.verbose) {
        console.log('find lib result set: ', libResult);
      }
      if (!libResult.length) {
        const libError = new Error(`${object.lib} lib was not found!\nCreate it by running:${object.createLib}`);
        callback(libError, false);
        return;
      }
      connection.query(object.findObject, (findObjectError, result) => {
        if (findObjectError) {
          callback(findObjectError, false);
          return;
        }
        if (config.verbose) {
          console.log('find lib result set: ', result);
        }
        if (!result.length) {
          const resultError = new Error(`${object.name} was not found! Create it by running: ${object.createObject}`);
          callback(resultError, false);
          return;
        }
        callback(null, true);
      });
    });
  });
}

function checkObjectExistsIDB(config, object = {}, callback) {
  // idb-connector is an optional dependency, since users may not use this transport
  // thus we can't globally require it
  // eslint-disable-next-line max-len
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies, import/no-unresolved
  const { dbconn, dbstmt } = require('idb-connector');

  /* eslint-disable new-cap */
  const connection = new dbconn();
  connection.conn('*LOCAL');
  const statement = new dbstmt(connection);

  statement.exec(object.findLib, (libResult, error) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (config.verbose) {
      console.log('find lib result set: ', libResult);
    }
    if (!libResult.length) {
      const libError = new Error(`${object.lib} lib was not found! Create it by running: ${object.createLib}`);
      callback(libError, null);
      return;
    }
    statement.closeCursor();
    statement.exec(object.findObject, (result, findObjecError) => {
      if (findObjecError) {
        callback(findObjecError, null);
        return;
      }
      if (config.verbose) {
        console.log('find object result set: ', result);
      }
      if (!result.length) {
        const resultError = new Error(`${object.name} was not found! Create it by running: ${object.createObject}`);
        callback(resultError, null);
        return;
      }
      statement.close();
      connection.disconn();
      connection.close();
      callback(null, true);
    });
  });
}

function checkObjectExists(config, obj = {}, callback) {
  const object = obj;

  if (!object.type) {
    callback(Error('Object type must be defined'), null);
    return;
  }

  if (!object.name) {
    callback(Error('Object name must be defined'), null);
    return;
  }

  object.lib = object.lib || 'NODETKTEST';

  if (object.type === '*DTAARA') {
    object.createObject = `CRTDTAARA DTAARA(${object.lib}/${object.name}) TYPE(*CHAR) TEXT('TEST DATA AREA FOR NODE TOOLKIT') VALUE('Hello From Test Data Area!')`;
  } else if (object.type === '*DTAQ') {
    object.createObject = `CRTDTAQ DTAQ(${object.lib}/${object.name}) MAXLEN(100) AUT(*EXCLUDE) TEXT('TEST DQ FOR NODE TOOLKIT TESTS')`;
  }

  object.findObject = `SELECT OBJNAME FROM TABLE (QSYS2.OBJECT_STATISTICS('${object.lib}', '${object.type}')) AS X WHERE OBJNAME = '${object.name}'`;
  object.createLib = `CRTLIB LIB(${object.lib}) TYPE(*TEST) TEXT('Used to test Node.js toolkit')`;
  object.findlib = `SELECT SCHEMA_NAME FROM qsys2.sysschemas WHERE SCHEMA_NAME = '${object.lib}'`;
  // eslint-disable-next-line no-param-reassign
  config.transportOptions.verbose = config.verbose;

  if (config.transport === 'idb') {
    checkObjectExistsIDB(config.transportOptions, object, callback);
  } else if (config.transport === 'odbc') {
    checkObjectExistsODBC(config.transportOptions, object, callback);
  } else if (config.transport === 'ssh') {
    checkObjectExistsSSH(config.transportOptions, object, callback);
  } else {
    // we cannot check object existence using the rest transport
    callback(null, true);
  }
}

module.exports.checkObjectExists = checkObjectExists;
