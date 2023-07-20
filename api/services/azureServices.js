const { BlobServiceClient } = require("@azure/storage-blob");
// const { listFiles } = require("./awsServices.cjs");
// const { ImportExport } = require("aws-sdk");
const multer = require("multer");
var multerAzure = require('multer-azure')

exports.upload = multer({
    storage: multerAzure({
        connectionString: 'DefaultEndpointsProtocol=https;AccountName=purva1;AccountKey=lqs1GKXGusWXmB37HIiBfQMY9X8IoK9X5fJxceWK6tKywYWkvUp3flA1PpyclxTA64FYRltjvBMS+AStpXTydw==;EndpointSuffix=core.windows.net', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
        account: 'purva1', //The name of the Azure storage account
        key: 'lqs1GKXGusWXmB37HIiBfQMY9X8IoK9X5fJxceWK6tKywYWkvUp3flA1PpyclxTA64FYRltjvBMS+AStpXTydw==', //A key listed under Access keys in the storage account pane
        container: 'purva-container1',  //Any container name, it will be created if it doesn't exist
        blobPathResolver: function(req, file, callback){
          var blobPath = file.originalname; //Calculate blobPath in your own way.
          callback(null, blobPath);
        }
      })

});

// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://purva1.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-09T21:01:51Z&st=2023-07-15T13:01:51Z&spr=https&sig=bolWnNqAf21whiTnTxGzNL%2BejW8loExgqZqdGW7bqto%3D";
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by
// appending the current time to the file name
const containerName = "container" + new Date().getTime();

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient("purva-container1");
const createContainer = async () => {
    try {
        console.log(`Creating container "${containerName}"...`);
        await containerClient.create();
        console.log(`Done. URL:${containerClient.url}`);
    } catch (error) {
        console.log(error.message);
    }
};

// exports.createContainer = async function() {
//     try {
//         console.log(`Creating container "${containerName}"...`);
//         await containerClient.create();
//         console.log(`Done. URL:${containerClient.url}`);
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const deleteContainer = async () => {
//     try {
//         console.log(`Deleting container "${containerName}"...`);
//         await containerClient.delete();
//         console.log(`Done.`);
//     } catch (error) {
//         console.log(error.message);
//     }
// };

exports.deleteContainer = async function() {
    try {
        console.log(`Deleting container "${containerName}"...`);
        await containerClient.delete();
        console.log(`Done.`);
    } catch (error) {
        console.log(error.message);
    }
};

exports.listFiles = async function() {
    // fileList.size = 0;
    // fileList.innerHTML = "";
    let size = 0;
    let files = [];
    try {
        console.log("Retrieving file list...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {

            files.push(blobItem.value.name);
            size += 1;
            blobItem = await iter.next();
        }
        if (size > 0) {
            console.log("Done.");
            return files;
        } else {
            console.log("The container does not contain any files.");
            return 0;
        }
    } catch (error) {
        console.log(error.message);
    }

    return 0;
};

// const uploadFiles = async () => {
//     try {
//         console.log("Uploading files...");
//         const promises = [];
//         for (const file of fileInput.files) {
//             const blockBlobClient = containerClient.getBlockBlobClient(file.name);
//             promises.push(blockBlobClient.uploadBrowserData(file));
//         }
//         await Promise.all(promises);
//         console.log("Done.");
//         listFiles();
//     }
//     catch (error) {
//             console.log(error.message);
//     }
// }
exports.uploadFiles = async function()
{
    // console.log(file)
    // console.log(typeof file)

    // try {
    //     // createContainer();
    //     console.log("Uploading files...");
    //     const promises = [];
    //     // for (const file of fileInput) {
    //         const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    //         promises.push(blockBlobClient.uploadBrowserData(file));
    //     // }
    //     console.log("Uploading files...");

    //     await Promise.all(promises);
    //     console.log("Done.");
    //     listFiles();
    // }
    // catch (error) {
    //     console.log(error.message);
    // }

    return 0;
};

// const deleteFiles = async () => {
//     try {
//         if (fileList.selectedOptions.length > 0) {
//             console.log("Deleting files...");
//             for (const option of fileList.selectedOptions) {
//                 await containerClient.deleteBlob(option.text);
//             }
//             console.log("Done.");
//             listFiles();
//         } else {
//             console.log("No files selected.");
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// };

exports.deleteFiles = async function(fileName) {
    try {
        // if (fileList.selectedOptions.length > 0) {
            console.log("Deleting files...");
            // for (const option of fileList.selectedOptions) {
                await containerClient.deleteBlob(fileName);
            // }
            console.log("Done.");
            listFiles();
        // } else {
        //     console.log("No files selected.");
        // }
    } catch (error) {
        console.log(error.message);
    }
};

// TODO: Download files
exports.downloadFiles = async function(fileName) {
    let downloadedContent = null;
    try {
        console.log("Downloading files...");
        const blobName = fileName;

        const blobClient = containerClient.getBlobClient(blobName);
        console.log(blobClient.url);
        return blobClient.url;
        const downloadBlockBlobResponse = await blobClient.download(0);
        downloadedContent = await downloadBlockBlobResponse.blobBody;
    }
    catch (error) {
            console.log(error.message);
    }

    return downloadedContent;
};

// const downloadFile = async () => {
//     if (fileList.selectedOptions.length > 0) {
//         const blobName = fileList.selectedOptions[0].text;
//         const blobClient = containerClient.getBlobClient(blobName);
//         const downloadBlockBlobResponse = await blobClient.download(0);
//         const downloadedContent = await downloadBlockBlobResponse.blobBody;
//         const url = window.URL.createObjectURL(downloadedContent);
//         const a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = blobName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//     } else {
//         console.log("No files selected.");
//     }
// };

// exports.downloadFile = async function(fileName) {
//     if (fileList.selectedOptions.length > 0) {
//         const blobName = fileList.selectedOptions[0].text;
//         const blobClient = containerClient.getBlobClient(blobName);
//         const downloadBlockBlobResponse = await blobClient.download(0);
//         const downloadedContent = await downloadBlockBlobResponse.blobBody;
//         const url = window.URL.createObjectURL(downloadedContent);
//         const a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = blobName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//     } else {
//         console.log("No files selected.");
//     }
// };
