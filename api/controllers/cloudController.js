'use strict';

const mongoose = require('mongoose');
var stream = require('stream');

const Cloud = mongoose.model('Cloud');
const aws = require('../services/awsServices.cjs')
const azure = require('../services/azureServices');
const { create } = require('domain');

exports.list_all_files = async function(req, res) {
  // if req. location == 'AWS' then list all files from AWS
  // else if req. location == 'Azure' then list all files from Azure
  let x = "null";
  console.log(req.params.location)
  if (req.params.location == 'AWS') {
    // list all files from AWS
    x = await aws.listFiles()
    console.log(x)
  }

  if (req.params.location == 'Azure') {
    // list all files from Azure
    x = await azure.listFiles()

    console.log(x)
  }


  res.status(200).send({message: x})

}

exports.upload_a_file_aws = async function(req, res) {

    console.log(req.body.location)
    console.log(req.body.file)
    // list all files from AWS
    await aws.uploadFile()

    const cloud = Cloud({
      file_name: req.body.fileName,
      created_by: req.body.created_by,
      location: req.body.location,
      created_date: Date.now()
    });

    console.log(cloud)

    cloud.save(function(err, cloud) {
      if (err != null) {
        res.send(err);
      }
    });

  res.json({ message: 'upload_a_file_aws' });
}

exports.upload_a_file_azure = async function(req, res, next) {

  // console.log(req.body.file)

  console.log(req.body.location)

  await azure.uploadFiles()

  const cloud = Cloud({
    file_name: req.body.fileName,
    created_by: req.body.created_by,
    location: req.body.location,
    created_date: Date.now()
  });

  console.log(cloud)

  cloud.save(function(err, cloud) {
    if (err != null) {
      res.send(err);
    }
  });

  res.json({ message: 'upload_a_file_azure' });
}

exports.read_a_file = async function(req, res) {
  console.log(req.params)
  if (req.params.location == 'AWS') {
    // list all files from AWS
    let x = await aws.downloadFile(req.params.fileName)
    console.log(x)
    res.json({'message': x})
    // var fileContents = Buffer.from(x, "base64");

    // console.log(fileContents)
    // var readStream = new stream.PassThrough();
    // readStream.end(fileContents);

    // // res.set('Content-disposition', 'attachment; filename=' + req.params.fileName);
    // // res.set('Content-Type', 'text/plain');

    // readStream.pipe(res);
  }

  if (req.params.location == 'Azure') {
    // list all files from Azure
    let x = await azure.downloadFiles(req.params.fileName)
    console.log("return "+ x)
    res.json({'message': {'data': x}})
  }

  // res.json({ message: 'list_all_files' });
}

exports.update_a_file = function(req, res) {
}

exports.delete_a_file = async function(req, res) {
  console.log(req.body.location)
  console.log(req.params.fileName)
  if (req.params.location == 'AWS') {
    // list all files from AWS
    let x = await aws.deleteFile(req.params.fileName)
    console.log(x)
    console.log('AWS')
  }

  if (req.params.location == 'Azure') {
    // list all files from Azure
    let x = await azure.deleteFiles(req.params.fileName)
    console.log(x)
  }

  Cloud.remove({
    file_name: req.params.fileName,
    location: req.params.location
  }, function(err, cloud) {
    if (err != null) {
      res.send(err);
    }
  });

  res.json({ message: 'delete_a_file' });
}
