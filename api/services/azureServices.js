const { BlobServiceClient } = require("@azure/storage-blob");

// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://purva1.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-09T21:01:51Z&st=2023-07-15T13:01:51Z&spr=https&sig=bolWnNqAf21whiTnTxGzNL%2BejW8loExgqZqdGW7bqto%3D";
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by
// appending the current time to the file name
const containerName = "container" + new Date().getTime();

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);
const createContainer = async () => {
    try {
        console.log(`Creating container "${containerName}"...`);
        await containerClient.create();
        console.log(`Done. URL:${containerClient.url}`);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteContainer = async () => {
    try {
        console.log(`Deleting container "${containerName}"...`);
        await containerClient.delete();
        console.log(`Done.`);
    } catch (error) {
        console.log(error.message);
    }
};


const listFiles = async () => {
    fileList.size = 0;
    fileList.innerHTML = "";
    try {
        console.log("Retrieving file list...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {
            fileList.size += 1;
            fileList.innerHTML += `<option>${blobItem.value.name}</option>`;


            blobItem = await iter.next();
        }
        if (fileList.size > 0) {
            console.log("Done.");
        } else {
            console.log("The container does not contain any files.");
        }
    } catch (error) {
        console.log(error.message);
    }
};

const uploadFiles = async () => {
    try {
        console.log("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        console.log("Done.");
        listFiles();
    }
    catch (error) {
            console.log(error.message);
    }
}

const deleteFiles = async () => {
    try {
        if (fileList.selectedOptions.length > 0) {
            console.log("Deleting files...");
            for (const option of fileList.selectedOptions) {
                await containerClient.deleteBlob(option.text);
            }
            console.log("Done.");
            listFiles();
        } else {
            console.log("No files selected.");
        }
    } catch (error) {
        console.log(error.message);
    }
};
