import axios, { AxiosResponse } from 'axios';
import { S3Client, PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { getEnv } from '../config';

const S3_BUCKET = getEnv('S3_BUCKET');
const BASE_UPLOAD_FILE_NAME = getEnv('BASE_UPLOAD_FILE_NAME');
const KAGGLE_BASE_URL = getEnv('KAGGLE_BASE_URL');
const KAGGLE_DATASET_USERNAME = getEnv('KAGGLE_DATASET_USERNAME');
const KAGGLE_DATASET_SLUG = getEnv('KAGGLE_DATASET_SLUG');
const KAGGLE_PERSONAL_USERNAME = getEnv('KAGGLE_PERSONAL_USERNAME');
const KAGGLE_PERSONAL_KEY = getEnv('KAGGLE_PERSONAL_KEY');

export const download = async (event: any) => {

const outputFileName = `${BASE_UPLOAD_FILE_NAME}.zip`;
const url = `${KAGGLE_BASE_URL}/datasets/download/${KAGGLE_DATASET_USERNAME}/${KAGGLE_DATASET_SLUG}`;
const auth = Buffer.from(`${KAGGLE_PERSONAL_USERNAME}:${KAGGLE_PERSONAL_KEY}`).toString('base64');

const kaggleFileBuffer = await getKaggleFile(url, auth);

S3Upload(S3_BUCKET, outputFileName, kaggleFileBuffer);

};

async function getKaggleFile(url: string, auth: string): Promise<ArrayBuffer> {
    const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        responseType: 'arraybuffer'
    })

    console.log('Kagge download success', response.status);

    return response.data;
}

async function S3Upload(bucket: string , fileName: string, payload: ArrayBuffer): Promise<PutObjectCommandOutput>{
    const s3 = new S3Client();
    const response = await s3.send(new PutObjectCommand({

        Bucket: bucket,
        Key: fileName,
        Body: Buffer.from(payload),
        ContentType: 'application/zip'
    }))

    console.log('S3 upload success', response.$metadata.httpStatusCode);

    return response;
}