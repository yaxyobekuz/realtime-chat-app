import React, { useState } from "react";

// Hooks
import useImageViewer from "@/hooks/useImageViewer";

// Icons
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

// Ui components
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Main ImageViewer component
const ImageViewer = () => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const { close, image, isOpen } = useImageViewer();

  const handleRotate = () => setRotation((prev) => prev + 90);
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  // Reset transformations when modal closes
  const handleOpenChange = (open) => {
    if (!open) {
      close();
      setScale(1);
      setRotation(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        {/* Header with controls */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          {/* Zoom out */}
          <button
            disabled={scale <= 0.5}
            onClick={handleZoomOut}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <ZoomOut size={20} />
          </button>

          {/* Zoom in */}
          <button
            onClick={handleZoomIn}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            disabled={scale >= 3}
          >
            <ZoomIn size={20} />
          </button>

          {/* Rotate */}
          <button
            onClick={handleRotate}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <RotateCw size={20} />
          </button>

          {/* Close */}
          <button
            onClick={() => handleOpenChange(false)}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image container */}
        <div className="flex items-center justify-center w-full h-full min-h-[400px] p-4">
          {image && (
            <img
              src={image.url}
              alt={image.alt}
              draggable={false}
              className="max-w-full max-h-full min-h-40 object-contain transition-transform duration-300 ease-in-out"
              style={{
                cursor: scale > 1 ? "grab" : "default",
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
            />
          )}
        </div>

        {/* Image info overlay */}
        <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-2 rounded">
          <p className="text-sm">{image?.alt}</p>
          <p className="text-xs opacity-70">
            Ko'rinish: {Math.round(scale * 100)}% | Aylanish: {rotation}°
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
