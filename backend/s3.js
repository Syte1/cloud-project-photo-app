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
function uploadFile(file){

  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}
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