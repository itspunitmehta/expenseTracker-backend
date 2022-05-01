const AWS = require('aws-sdk');

const uploadFiletoS3 = (data, filename) => {
    const BUCKET_NAME = 'expensetrackerapp';
    const IAM_USER_KEY = 'AKIAUBEHLO6BR6H6TM4C';
    const IAM_USER_SECRET = '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';

    let s3Buket = new AWS.S3( {
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })
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