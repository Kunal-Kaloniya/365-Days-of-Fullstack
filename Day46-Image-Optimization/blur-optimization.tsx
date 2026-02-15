// === Next.js Image Magic & BlurHash ===
// In a "Full-Fledged" app, images should be lazy-loaded, responsive, and compressed.
//
// === The LCP (Largest Contentful Paint) ===
// 1. WebP/AVIF: Modern formats that provide superior compression (30% smaller than JPEG) without losing quality.
// 2. BlueHash: A compact representation of a placeholder for an image. Instead of a blank white box while the 2MB image loads, the user sees a beautiful, blurry version of the actual image.
// It's encoded into a tiny string (e.g., L6PZfvt700~q00WY00Q-00ay9G9G).
// 3. Next.js <Image /> Component: Automatically performs "On-demand Optimization". It resizes images based on the user's device (Mobile vs. Desktop).


// MICROLAB
// Implement a dynamic image gallery where images have a "Blur" effect until they are fully loaded.
import Image from 'next/image';

// You would generate this blurDataURL on the server when the image is uploaded
const placeholderBlur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwM4ihSTVQAAAABJRU5ErkJggg==";

export default function OptimizedGallery({ src, alt }) {
    return (
        <div className="relative w-full h-64">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                plaveholder="blur"
                blurDataURL={placeholderBlur}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
            />
        </div>
    );
}