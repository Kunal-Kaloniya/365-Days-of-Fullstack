/**
 * 
 * === AWS S3 & Presigned URLs ===
 * In a professional MERN app, you never store images or videos on your local servers or in MongoDB.
 * It's slow, expensive and doesn't scale.
 * 
 * In most of the tutorials you learn to send a file from the Frontend -> Backend -> S3.
 * 
 * The Problem: Your backend becomes a bottleneck. If 100 users upload a 10MB file,
 * your Node.js server crashes because it's busy processing the "middleman" data.
 * 
 * The Solution:
 * === Presigned URLs ===
 * 1. Your frontend asks the backend: "Can I upload a file?"
 * 2. Backend asks AWS for a temporary, secure URL.
 * 3. Backend sends that URL back to the Frontend.
 * 4. Frontend uploads the file directly to S3.
 * 
 */


// MICROLAB
// Set up a Node.js utility using the @aws-sdk/s3-request-presigner to generate these secure links.
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedURL } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({ region: "ap-south-1" });

export async function getUploadURL(fileName, fileType) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${fileName}`,
        ContentType: fileType,
    });

    // URL expires in 60 seconds for maximum security
    const url = await getSignedURL(s3, command, { expiresIn: 60 });
    return url;
}