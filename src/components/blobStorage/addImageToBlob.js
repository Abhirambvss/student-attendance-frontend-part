import { BlobServiceClient } from '@azure/storage-blob';

const containerName = `student-attendance`;
const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return (!storageAccountName || !sasToken) ? false : true;
}


// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    // get list of blobs in container
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
}

// const getBlobNamesInContainer = async (containerClient) => {
//     const returnedBlobUrls = [];

//     // get list of blobs in container
//     for await (const blob of containerClient.listBlobsFlat()) {
//         // if image is public, just construct URL
//         returnedBlobUrls.push(blob.name);
//     }

//     return returnedBlobUrls;
// }

const createBlobInContainer = async (containerClient, file) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
}

const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
        access: 'container',
    });

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};

const deleteFiles = async (file) => {

    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    const containerClient = blobService.getContainerClient(containerName);

    try {
        await containerClient.deleteBlob(file);
    }
    catch (error) {
        console.log(error.message);
    }
    return getBlobsInContainer(containerClient);

};

export { uploadFileToBlob, deleteFiles };
