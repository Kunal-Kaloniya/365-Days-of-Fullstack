// === Designing a Global Video Streamer (The "Netflix" Model) ===
// To celebrate Day 100, we aren't looking at a single component. We are looking at the Whole Stack.
// 
// === The Architecture Breakdown ===
// 1. The Ingestion (LSM-Tree & Queues): When a video is uploaded, it's broken into thousands of "chunks." We use Kafka to manage the encoding pipeline (converting 4K to 1080p, 720p, etc.).
// 
// 2. The Storage (Data Lake): Raw files live in S3. Metadata (user profiles, watch history) lives in Postgres with Read Replicas.
// 
// 3. The Delivery (CDN & Edge): We don't stream from our main server. We use Edge Caching and Open Connect appliances to put the video file in a data center literally inside the user's ISP network.
// 
// 4. The Gateway (Service Mesh): Thousands of microservices (Billing, Recommendation, Auth) talk via Istio with circuit breakers to ensure that if "Recommendations" go down, the "Play" button still works.


// === MICROLAB ===
// Implement an "Adaptive Bitrate" simulator.
// This logic decides which video chunk to send based on the user's current network speed—the core "magic" of modern streaming.
interface VideoChunk {
    quality: '4K' | '1080p' | '720p';
    url: string;
}

export const getNextChunk = (bandwidthMbps: number, playlist: VideoChunk[]) => {
    // Logic: Always serve the highest quality the network can handle
    if (bandwidthMbps > 25) return playlist.find(c => c.quality === '4K');
    if (bandwidthMbps > 10) return playlist.find(c => c.quality === '1080p');
    return playlist.find(c => c.quality === '720p');
};

console.log("🎥 System Logic: Adaptive Bitrate Streaming Active.");