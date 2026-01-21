"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * YouTube Facade Pattern for LCP optimization.
 * Shows a thumbnail with play button until user clicks to load the iframe.
 * This prevents the YouTube iframe from blocking LCP.
 *
 * Features:
 * - Thumbnail fallback chain (maxres → hq → default)
 * - Focus management for accessibility
 * - Touch-friendly active states
 * - No autoplay (blocked on mobile anyway)
 */
export function YouTubeFacade({ videoId, title, className }: YouTubeFacadeProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Thumbnail fallback chain - try higher quality first
  const thumbnailUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
  ];

  const handlePlay = useCallback(() => {
    setShowVideo(true);
  }, []);

  // Handle thumbnail load error - try next quality level
  const handleThumbnailError = useCallback(() => {
    if (thumbnailIndex < thumbnailUrls.length - 1) {
      setThumbnailIndex(prev => prev + 1);
    }
  }, [thumbnailIndex, thumbnailUrls.length]);

  // Focus management - move focus to iframe after video loads
  useEffect(() => {
    if (showVideo && iframeRef.current) {
      // Small delay to ensure iframe is ready
      const timer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  if (showVideo) {
    return (
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        allow="encrypted-media"
        allowFullScreen
        tabIndex={0}
        className={cn("absolute inset-0 w-full h-full", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={cn(
        "absolute inset-0 w-full h-full cursor-pointer group",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // Touch active state for mobile feedback
        "active:opacity-90",
        className
      )}
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={thumbnailUrls[thumbnailIndex]}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
        className="object-cover"
        priority
        onError={handleThumbnailError}
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/60 group-hover:bg-white/80 group-hover:scale-110 group-active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg">
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-primary ml-1" />
        </div>
      </div>
    </button>
  );
}
