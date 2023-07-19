'use strict';

module.exports = function(app) {
  const cloud = require('../controllers/cloudController');
  const aws = require('../services/awsServices.cjs');
  const azure = require('../services/azureServices');

  // try if else here for location

  // cloud Routes
  app
    .route('/cloud/:location')
    .get(cloud.list_all_files)

  app
    .route('/cloud/aws/upload')
    .post(aws.upload.single('file'), cloud.upload_a_file_aws);

  app.route('/cloud/azure/upload')
    .post(azure.upload.single('file'), cloud.upload_a_file_azure);

  app
    .route('/cloud/:fileName')
    .get(cloud.read_a_file)
    .put(cloud.update_a_file)
    .delete(cloud.delete_a_file);

};
