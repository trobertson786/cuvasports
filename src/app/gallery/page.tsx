import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import TranslatedHeading from "@/components/TranslatedHeading";

export const metadata = generatePageMetadata(
  "Gallery",
  "A visual collection of CUVA Sports photography."
);

const matchImages = [
  { src: "/images/gallery/tottenham-stadium-exterior.jpg", alt: "Tottenham Hotspur Stadium exterior — Champions League night" },
  { src: "/images/gallery/tottenham-stadium-interior.jpg", alt: "Inside the Tottenham Hotspur Stadium — Spurs vs Atletico Madrid" },
  { src: "/images/gallery/chelsea-vs-psg.jpg", alt: "Stamford Bridge fixture board — Chelsea vs PSG" },
  { src: "/images/gallery/leicester-vs-qpr.jpg", alt: "King Power Stadium — Leicester vs QPR" },
  { src: "/images/gallery/west-ham-vs-brentford.jpg", alt: "London Stadium — West Ham vs Brentford" },
];

const archiveImages = Array.from({ length: 54 }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return { src: `/images/gallery/cuva-sports-${num}.jpg`, alt: `CUVA Sports ${num}` };
});

const images = [...matchImages, ...archiveImages];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TranslatedHeading titleKey="gallery.title" />
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-4">
        {images.map((img) => (
          <div key={img.src} className="mb-4 break-inside-avoid overflow-hidden rounded-lg relative group">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className="w-full hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
