import { Readable } from "stream";
import { getS3 } from "../../services/aws";
import { getEnv } from "../config";
import unzipper from 'unzipper';

const zipFileExtract = getEnv('ORIGINAL_FILE_NAME');
const baseFileName = getEnv('BASE_UPLOAD_FILE_NAME');

export const clean = async (event: any) => {

    const inputFileName = `${baseFileName}.zip`; 
    const outputFileName = `${baseFileName}-cleaned.zip`; 
    const newCsvFileName = `cleaned-${baseFileName}`; 

    const file = await getS3(inputFileName);
}

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function extractCsvFromZipBuffer(zipBuffer: Buffer): Promise<Buffer> {
  const directory = await unzipper.Open.buffer(zipBuffer);
  const csvFile = directory.files.find(file => file.path.endsWith('.csv'));
  if (!csvFile) throw new Error('CSV file not found in zip');

  return await csvFile.buffer();
}