'use strict';

module.exports = function(app) {
  const cloud = require('../controllers/cloudController');

  // cloud Routes
  app
    .route('/cloud')
    .get(cloud.list_all_files)
    .post(cloud.upload_a_file);

  app
    .route('/cloud/:fileName')
    .get(cloud.read_a_file)
    .put(cloud.update_a_file)
    .delete(cloud.delete_a_file);

};
