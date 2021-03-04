/**
 * Checks if XMLSERVICE version supports QSH.
 * XMLSERVICE >= 1.9.8 supports QSH
 * @param {string} version - expects sematic version i.e. 1.2.3
 */
function isQSHSupported(version) {
  // maps array of strings to numbers i.e. ['1', '2', '3'] -> [1, 2, 3]
  const semver = version.split('.').map(Number);
  if (semver[0] === 1 && semver[1] < 9) {
    return false;
  } if (semver[0] === 1 && semver[1] === 9 && semver[2] < 8) {
    return false;
  }
  return true;
}

module.exports.isQSHSupported = isQSHSupported;
