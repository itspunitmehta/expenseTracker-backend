const AWS = require('aws-sdk');

const uploadFiletoS3 = async (data, filename) => {
    const BUCKET_NAME = 'expensetrackerapp';

    let s3Buket = await new AWS.S3( {
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET
    })
    console.log(s3Buket.accessKeyId);
        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }
        return new Promise((resolve, reject)=>{
            s3Buket.upload(params,(err,response)=>{
                if(err){
                    // console.log('something went wrong', err)
                    reject(err);
                }else{
                    // console.log('success', response.Location)
                    resolve(response.Location)
                }
            })
        })
}

module.exports = {
    uploadFiletoS3
}