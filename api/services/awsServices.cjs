const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: "wvlO/RHpSP1IebkBn4xiLgIj3SB30qLMRS8GpNdA",
    accessKeyId: "AKIAXIICH77FCL42BLFF",
    region: "us-west-2",

});
const BUCKET = "purva4bucket"
const s3 = new aws.S3();

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})


// async function uploadFile(file) {
//     let x = await s3.upload({ Bucket: BUCKET, Key: file.originalname, Body: file.buffer }).promise();
//     return x.Location;
// }
exports.uploadFile = async function() {
    // let x = await s3.upload({ Bucket: BUCKET, Key: file.originalname, Body: file.buffer }).promise();
    // return x.Location;
    // upload.single('file')
    console.log("uploadFile")
}


exports.listFiles = async function() {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map(item => item.Key);
    return x;
}

exports.downloadFile = async function(filename) {
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    return x.Body;
}
// async function downloadFile(filename) {
//     let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
//     return x.Body;
// }
exports.deleteFile = async function(filename) {
    let x = await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    return x;
}

// async function deleteFile(filename) {
//     let x = await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
//     return x;
// }

// async function downloadFile(filename) {
//     let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();

//     return x.Body;
// }
