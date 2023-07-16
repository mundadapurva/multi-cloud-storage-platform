const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,

});
const BUCKET = process.env.AWS_BUCKET
const s3 = new aws.S3();

const upload = multer({
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


async function uploadFile(file) {
    let x = await s3.upload({ Bucket: BUCKET, Key: file.originalname, Body: file.buffer }).promise();
    return x.Location;
}


async function listFiles() {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map(item => item.Key);
    return x;
}


async function downloadFile(filename) {
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    return x.Body;
}


async function deleteFile(filename) {
    let x = await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    return x;
}

async function downloadFile(filename) {
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();

    return x.Body;
}
