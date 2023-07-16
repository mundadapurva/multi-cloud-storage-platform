'use strict';

const mongoose = require('mongoose');

const Cloud = mongoose.model('Cloud');
const aws = require('../services/awsServices')
const azure = require('../services/azureServices')

exports.list_all_files = async function(req, res) {
  // if req. location == 'AWS' then list all files from AWS
  // else if req. location == 'Azure' then list all files from Azure
  console.log(req.body.location)
  if (req.body.location == 'AWS') {
    // list all files from AWS
    let x = await aws.listFiles()
    console.log(x)
    console.log('AWS')
  }

  if (req.body.location == 'Azure') {
    // list all files from Azure
    azure.listFiles()
  }

  res.json({ message: 'list_all_files' });

}

exports.upload_a_file = function(req, res) {
}

exports.read_a_file = function(req, res) {
}

exports.update_a_file = function(req, res) {
}

exports.delete_a_file = function(req, res) {
}
