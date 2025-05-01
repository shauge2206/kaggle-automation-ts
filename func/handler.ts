import axios, { AxiosResponse } from 'axios';
import { S3Client, PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';

const S3_BUCKET = process.env.S3_BUCKET;

const BASE_UPLOAD_FILE_NAME = process.env.BASE_UPLOAD_FILE_NAME;

const KAGGLE_BASE_URL = process.env.KAGGLE_BASE_URL;
const KAGGLE_DATASET_USERNAME = process.env.KAGGLE_DATASET_USERNAME;
const KAGGLE_DATASET_SLUG = process.env.KAGGLE_DATASET_SLUG;

const KAGGLE_PERSONAL_USERNAME = process.env.KAGGLE_USERNAME;
const KAGGLE_PERSONAL_KEY = process.env.KAGGLE_KEY;

export const download = async (event: any) => {

if (!process.env.S3_BUCKET) {
    throw new Error("Missing required env var: S3_BUCKET");
}

const outputFileName = `${BASE_UPLOAD_FILE_NAME}.zip`;
const requestUrl = `${KAGGLE_BASE_URL}/datasets/download/${KAGGLE_DATASET_USERNAME}/${KAGGLE_DATASET_SLUG}`;

const basicAuth = Buffer.from(`${KAGGLE_PERSONAL_USERNAME}:${KAGGLE_PERSONAL_KEY}`).toString('base64');

const kaggleFileBuffer = getKaggleFile();

uploadS3(S3_BUCKET, BASE_UPLOAD_FILE_NAME, kaggleFileBuffer);

};

async function getKaggleFile(): Promise<ArrayBuffer | undefined> {
    try {
        const response: AxiosResponse<ArrayBuffer> = await axios.get(requestUrl, {
            headers: {
                Authorization: `Basic ${basicAuth}`,
            },
            responseType: 'arraybuffer'
        })
        console.log('Success', response.status);
        return response.data;
    } catch (error) {
        console.error('Error during axios request', error.message);
        return undefined;
    }
}

async function uploadS3(bucket: string , fileName: string, payload: ArrayBuffer): Promise<PutObjectCommandOutput>{
    const s3 = new S3Client();
    const response = await s3.send(new PutObjectCommand({

        Bucket: bucket,
        Key: fileName,
        Body: Buffer.from(payload),
        ContentType: 'application/zip'
    }))

    return response;
}