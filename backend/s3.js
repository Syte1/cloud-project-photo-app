require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_DEFAULT_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


//uploads a file to s3
const uploadFile = async (file, randomID) => {
  const { originalname, buffer } = file;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${randomID}.${originalname.split('.').pop()}`, // You can change this to a unique filename like you did before with the `storage` configuration if you'd like
    Body: buffer,
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};
exports.uploadFile = uploadFile

function getFileStream(fileKey){
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream



//sownloads a file from s3