import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Gallery",
  "A visual collection of CUVA Sports photography."
);

const images = Array.from({ length: 54 }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return { src: `/images/gallery/cuva-sports-${num}.jpg`, alt: `CUVA Sports ${num}` };
});

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TranslatedHeading titleKey="gallery.title" />
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-4">
        {images.map((img) => (
          <div key={img.src} className="mb-4 break-inside-avoid">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className="w-full rounded-lg hover:shadow-lg transition-shadow duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
