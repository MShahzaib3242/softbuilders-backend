import { Storage, Bucket } from "@google-cloud/storage";
import path from "path";
import moment from "moment";
import { makeSlug } from "./utils";
import * as fs from 'fs';

// Create a Storage instance with the service account key file path
const storage = new Storage({
    keyFilename: path.join(__dirname, "../../service_account.json"), // Replace with your service account file path
});

export type UploadReturnType = {
    status: boolean;
    name: string | null;
    url: string | null;
    message: string | null;
    fieldname: string,
    size: number | string | null
    type: string | null
}

export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: any;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;

}

export async function uploadFileToGC(username:string = 'softbuilders' ,reqFile: MulterFile, folder: string = 'resume') {
    try {
        const nameWithoutExt = path.parse(reqFile.originalname).name;
        const extension = path.extname(reqFile.originalname);
        let newFilename = `${username}-${moment().format('DDMMYYHmmss')}-${Math.floor(Math.random() * 100)}`;
        newFilename = makeSlug(newFilename) + extension;
        
        const bucket: Bucket = storage.bucket('softbuilder');
        const file = bucket.file(`${folder}/${newFilename}`);

        const fileStream = file.createWriteStream({
            resumable: false, // Set to true if you want to use resumable uploads
          });

          return new Promise((resolve, reject) => {
            fileStream.on('error', (err) => {
                reject(`Unable to upload file: ${err}`);
              });
        
              fileStream.on('finish', async () => {
                
                resolve({
                    status: true,
                    name: newFilename,
                    url: file.publicUrl(),
                    message: 'Uploaded successfully',
                    fieldname: reqFile.fieldname,
                    size: reqFile.size,
                    type : extension,
                });
              });
        
            // Pipe the Blob data to the writable stream
            const readStream = fs.createReadStream("uploads/"+reqFile.filename);
            readStream.pipe(fileStream);
          });
        
    } catch (error: any) {
        return { status: false, name: null, url: null, message: error.message, fieldname: reqFile.fieldname, size: reqFile.size  , type : null,};
    }
}

export async function uploadFileFromPathToGC(
    filePath: string,
    destinationFileName: string
) {
    const bucketName = "softbuilder";
    try {
        // Specify the bucket and file path for upload
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(destinationFileName);

        // Upload the file to the specified location in the bucket
        await file.save(filePath);

        console.log(
            `File ${filePath} uploaded to ${destinationFileName} in ${bucketName}.`
        );
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

export async function deleteFileFromGC(fileName: string) {
    const bucketName = 'softbuilder';
    try {
      // Specify the bucket and file to be deleted
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
  
      // Delete the file from the bucket
      await file.delete();
  
      console.log(`File ${fileName} deleted from ${bucketName}.`);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }