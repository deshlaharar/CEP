
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomLevel(1);
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div className="relative overflow-hidden rounded-lg bg-white">
        <div
          className="aspect-square w-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={`w-full h-full transition-transform duration-200 ${isZooming ? 'cursor-zoom-in' : ''}`}
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
              backgroundSize: isZooming ? `${zoomLevel * 120}%` : 'contain',
              backgroundPosition: isZooming 
                ? `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%` 
                : 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-hunar-earth p-1.5 rounded-full transition-colors"
          onClick={goToPrevImage}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-hunar-earth p-1.5 rounded-full transition-colors"
          onClick={goToNextImage}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Fullscreen button */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="absolute right-2 top-2 bg-white/80 hover:bg-white text-hunar-earth p-1.5 rounded-full transition-colors"
              aria-label="View fullscreen"
            >
              <ZoomIn size={20} />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="aspect-[4/3] w-full">
              <img
                src={images[currentImageIndex]}
                alt={`${productName} - fullscreen view`}
                className="h-full w-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
              index === currentImageIndex 
                ? 'ring-2 ring-hunar-terracotta' 
                : 'ring-1 ring-hunar-sand hover:ring-hunar-clay'
            }`}
            onClick={() => handleSelectThumbnail(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${productName} - thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
