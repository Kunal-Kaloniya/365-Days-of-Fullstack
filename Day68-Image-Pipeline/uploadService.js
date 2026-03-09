// === High-Performance Image Processing ===
// When a user uploads a profile picture, you don't just "save" it.
// You need a thumbnail, a medium version, and a compressed original.
// 
// === The Processing Buffer ===
// 1. Sharp: A lightning-fast Node.js library (using the libvips C library) that can process images 4x-5x faster than alternatives like Jimp or GM.
// 
// 2. Stream-based Processing: Instead of saving the file to your server's disk first, you process it in-memory as a Buffer and stream it directly to S3. This makes your app "Stateless" and more secure.
// 
// 3. Format Optimization: Converting images to WebP or AVIF can reduce file size by 30-50% with zero noticeable loss in quality.


// MICROLAB
// Create a middleware that intercepts an upload, resizes it to a 500x500 square, converts it to WebP, and uploads it to AWS S3.
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

export const processAndUpload = async (fileBuffer, fileName) => {
    // 1. Process with Sharp
    const optimizedBuffer = await sharp(fileBuffer)
        .resize(500, 500, { fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer();

    // 2. Stream directly to S3
    const command = new PutObjectCommand({
        Bucket: 'my-app-assets',
        Key: `products/${fileName}.webp`,
        Body: optimizedBuffer,
        ContentType: 'image/webp',
    });

    await s3.send(command);
    return `https://my-app-assets.s3.amazonaws.com/products/${fileName}.webp`;
};