"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  alt: string;
  initialIndex: number;
  className?: string;
  imageClassName?: string;
  showOverlay?: boolean;
}

export default function ImageLightbox({
  images,
  alt,
  initialIndex = 0,
  className = "",
  imageClassName = "",
  showOverlay = false,
}: ImageLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(initialIndex);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className={`relative rounded-lg overflow-hidden cursor-pointer group ${className}`}
        onClick={() => openLightbox(initialIndex)}
      >
        <Image
          src={images[initialIndex] || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-300 ${imageClassName}`}
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh] max-w-5xl flex items-center justify-center">
                <Image
                  src={images[activeImageIndex] || "/placeholder.svg"}
                  alt={`${alt} full view`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                {activeImageIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
