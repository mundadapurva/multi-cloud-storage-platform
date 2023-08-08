'use strict';

module.exports = function(app) {
  const cloud = require('../controllers/cloudController');
  const aws = require('../services/awsServices.cjs');
  const azure = require('../services/azureServices');

  // cloud Routes
  app
    .route('/cloud/read/:location')
    .get(cloud.list_all_files)

  app
    .route('/cloud/upload/AWS')
    .post(aws.upload.single('file'), cloud.upload_a_file_aws);

  app.route('/cloud/upload/Azure')
    .post(azure.upload.single('file'), cloud.upload_a_file_azure);

  app
    .route('/cloud/:location/:fileName')
    .get(cloud.read_a_file)

  app.
    route('/cloud/delete/:location/:fileName')
    .delete(cloud.delete_a_file);

};
