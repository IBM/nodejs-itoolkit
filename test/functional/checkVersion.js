/**
 * Checks if XMLSERVICE version supports QSH. 
 * XMLSERVICE >= 1.9.8 supports QSH
 * @param {string} version - expects sematic version i.e. 1.2.3
 */
function isQSHSupported(version) {
  const semver = version.split('.');
  if (semver[0] == 1 && semver[1] < 9) {
    return false;
  } else if (semver[0] == 1 && semver[1] == 9 && semver[2] < 8) {
    return false
  }
  return true;
}

module.exports.isQSHSupported = isQSHSupported;
