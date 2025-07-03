import { S3Client, PutObjectCommand, PutObjectCommandInput, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { SSMClient, GetParameterCommand, GetParameterCommandOutput } from '@aws-sdk/client-ssm';
import { getEnv } from "../func/config";
import { Readable } from "stream";

const S3_BUCKET = getEnv('S3_BUCKET');
const SSM_HEROKU_KEY = getEnv('SSM_HEROKU_KEY');
const s3Client = new S3Client();
const ssmClient = new SSMClient({});

export async function putS3(stream: Buffer | Readable , fileName: string): Promise<string> {
    const input: PutObjectCommandInput = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: stream,
        ContentType: "application/zip",
  };

  const command = new PutObjectCommand(input);
  await s3Client.send(command);

  console.log(`Successfully uploaded '${fileName}' to '${S3_BUCKET}'.`);
  return `Successfully uploaded '${fileName}' to '${S3_BUCKET}'.`;
}

export async function getS3(fileName: string): Promise<GetObjectCommandOutput> {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileName,
  });

  const response = await s3Client.send(command);
  return response;
}

export async function getSSM(keyName?: string): Promise<string> {
  const key = keyName ?? SSM_HEROKU_KEY;

  const command = new GetParameterCommand({
    Name: key,
    WithDecryption: true
  });

  const response: GetParameterCommandOutput = await ssmClient.send(command);
  return response.Parameter?.Value || '';
}