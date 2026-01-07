/**
 * Node.js Streams and Buffers:
 * 
 * Buffer (The Bucket): Loading the entire dataset into RAM before processing. If the file is 2GB and your RAM is 1GB, the process dies.
 * Stream (The Conveyor Belt): Processing data chunk-by-chunk (typically 64KB). You can process a 100GB file with only 10MB of RAM.
 * 
 */


// MICROLAB: Create a script that reads a large file and compresses it on the fly using Node's native zlib and pipeline.
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');

// This uses almost ZERO RAM regardless of the file size
pipeline(
    createReadStream('large_input.txt'),
    createGzip(),
    createWriteStream('large_input.txt.gz'),
    (err) => {
        if (err) {
            console.error('Pipeline failed: ', err);
        } else {
            console.log('Pipeline succeeded (Compression complete).')
        }
    }
);