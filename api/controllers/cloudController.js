'use strict';

const mongoose = require('mongoose');

const Cloud = mongoose.model('Cloud');
const aws = require('../services/awsServices.cjs')
const azure = require('../services/azureServices')

exports.list_all_files = async function(req, res) {
  // if req. location == 'AWS' then list all files from AWS
  // else if req. location == 'Azure' then list all files from Azure
  let x = 0;
  console.log(req.params.location)
  if (req.params.location == 'AWS') {
    // list all files from AWS
    x = await aws.listFiles()
    console.log(x)
    console.log('AWS')
  }

  if (req.params.location == 'Azure') {
    // list all files from Azure
    x = await azure.listFiles()

    console.log(x)
  }

  res.json({ message: x });

}

exports.upload_a_file = async function(req, res, next) {
  console.log(req.params.location)
  console.log(req.body.file)
  if (req.params.location == 'AWS') {
    // list all files from AWS
    await aws.uploadFile()

  }

  if (req.params.location == 'Azure') {
    // list all files from Azure
    let x = await azure.uploadFiles(req.body.file)
    console.log(x)
  }

  res.json({ message: 'upload_a_file' });
}

exports.upload_a_file_azure = async function(req, res, next) {

  console.log(req.body.file)

  await azure.uploadFiles(req.body.file)

  res.json({ message: 'upload_a_file_azure' });
}

exports.read_a_file = async function(req, res) {
  console.log(req.body.location)
  console.log(req.params.fileName)
  if (req.body.location == 'AWS') {
    // list all files from AWS
    let x = await aws.downloadFile(req.params.fileName)
    console.log(x)
    console.log('AWS')
    res.send(x)
  }

  if (req.body.location == 'Azure') {
    // list all files from Azure
    let x = await azure.downloadFiles(req.params.fileName)
    // TODO: send file to client
    console.log(x)
    res.send(x)
  }

  // res.json({ message: 'list_all_files' });
}

exports.update_a_file = function(req, res) {
}

exports.delete_a_file = async function(req, res) {
  console.log(req.body.location)
  console.log(req.params.fileName)
  if (req.body.location == 'AWS') {
    // list all files from AWS
    let x = await aws.deleteFile(req.params.fileName)
    console.log(x)
    console.log('AWS')
  }

  if (req.body.location == 'Azure') {
    // list all files from Azure
    let x = await azure.deleteFiles(req.params.fileName)
    console.log(x)
  }

  res.json({ message: 'delete_a_file' });
}
