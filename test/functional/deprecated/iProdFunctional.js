// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iProd } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection
// iConn only supported idb and rest transports
if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const {
  database, username, password, host, port = 80, path,
} = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = {
    host,
    port,
    path,
  };
}

describe('iProd Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('constructor', function () {
    it('creates and returns an instance of iProd', function () {
      const connection = new iConn(database, config.user, password);

      const prod = new iProd(connection);

      expect(prod).to.be.instanceOf(iProd);
    });
  });

  describe('getPTFInfo', function () {
    it('returns info for specified ptf', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const prod = new iProd(connection);

      prod.getPTFInfo('SI67726', (ptf) => {
        expect(ptf).to.be.an('Object');
        expect(ptf).to.have.a.property('Product_ID');
        expect(ptf).to.have.a.property('PTF_ID');
        expect(ptf).to.have.a.property('Release_level');
        expect(ptf).to.have.a.property('Product_option');
        expect(ptf).to.have.a.property('Load_ID');
        expect(ptf).to.have.a.property('Loaded_status');
        expect(ptf).to.have.a.property('Cover_letter_status');
        expect(ptf).to.have.a.property('On-order_status');
        expect(ptf).to.have.a.property('Save_file_status');
        expect(ptf).to.have.a.property('File_name');
        expect(ptf).to.have.a.property('File_library_name');
        expect(ptf).to.have.a.property('PTF_type');
        expect(ptf).to.have.a.property('IPL_action');
        expect(ptf).to.have.a.property('Action_pending');
        expect(ptf).to.have.a.property('Action_required');
        expect(ptf).to.have.a.property('PTF_is_released');
        expect(ptf).to.have.a.property('Target_release');
        expect(ptf).to.have.a.property('Superseding_PTF');
        expect(ptf).to.have.a.property('Current_IPL_source');
        expect(ptf).to.have.a.property('Minimum_level');
        expect(ptf).to.have.a.property('Maximum_level');
        expect(ptf).to.have.a.property('Format_information_available');
        expect(ptf).to.have.a.property('Status_date_and_time');
        expect(ptf).to.have.a.property('Licensed_Internal_Code_group');
        expect(ptf).to.have.a.property('Superseded_by_PTF_ID');
        expect(ptf).to.have.a.property('Current_server_IPL_source');
        expect(ptf).to.have.a.property('Server_IPL_required');
        expect(ptf).to.have.a.property('Creation_date_and_time');
        expect(ptf).to.have.a.property('Technology_refresh_PTF');
        done();
      });
    });
  });

  describe('getProductInfo', function () {
    it('returns info for specified product', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const prod = new iProd(connection);

      prod.getProductInfo('5770DG1', (product) => {
        expect(product).to.be.an('Object');
        expect(product).to.have.a.property('Product_ID');
        expect(product).to.have.a.property('Release_level');
        expect(product).to.have.a.property('Product_option');
        expect(product).to.have.a.property('Load_ID');
        expect(product).to.have.a.property('Symbolic_load_state');
        expect(product).to.have.a.property('Load_error_indicator');
        expect(product).to.have.a.property('Load_state');
        expect(product).to.have.a.property('Supported_flag');
        expect(product).to.have.a.property('Registration_type');
        expect(product).to.have.a.property('Registration_value');
        expect(product).to.have.a.property('Offset_to_additional_information');
        expect(product).to.have.a.property('Primary_language_load_identifier');
        expect(product).to.have.a.property('Minimum_target_release');
        expect(product).to.have.a.property('Minimum_VRM_of_*BASE_required_by_option');
        expect(product).to.have.a.property('Requirements_met_between_base_and_option_value');
        expect(product).to.have.a.property('Level');
        done();
      });
    });
  });

  // REST transport currently failing with 414 URI Too Long response code
  // The requested URL's length exceeds the capacity limit for this server
  describe('getInstalledProducts', function () {
    it('returns info for installed products', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const prod = new iProd(connection);

      prod.getInstalledProducts((products) => {
        expect(products).to.be.an('Array');
        expect(products.length).to.be.greaterThan(0);

        products.forEach((product) => {
          expect(product).to.be.an('Object');
          expect(product).to.have.a.property('Product_ID');
          expect(product).to.have.a.property('Product_option');
          expect(product).to.have.a.property('Release_level');
          expect(product).to.have.a.property('Description_text_message_ID');
          expect(product).to.have.a.property('Description_text_object_name');
          expect(product).to.have.a.property('Description_text_library_name');
          expect(product).to.have.a.property('Installed_flag');
          expect(product).to.have.a.property('Supported_flag');
          expect(product).to.have.a.property('Registration_type');
          expect(product).to.have.a.property('Registration_value');
          expect(product).to.have.a.property('Description_text');
        });
        done();
      });
    });
  });
});
