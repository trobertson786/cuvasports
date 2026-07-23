"use client";

import Image from "next/image";
import { useState } from "react";
import MatchReportFallback from "./MatchReportFallback";

/**
 * Match-card image with a graceful branded fallback. Renders the
 * <MatchReportFallback/> component when no `src` is provided or when the remote
 * image fails to load (onError). Must be placed inside a relatively positioned,
 * sized container (it uses next/image `fill`).
 */
type Props = {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export default function MatchCardImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <MatchReportFallback />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
