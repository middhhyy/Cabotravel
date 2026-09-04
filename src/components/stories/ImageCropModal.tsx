import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Move } from "lucide-react";
import { getCroppedImg } from "@/lib/cropImage";
import { toast } from "sonner";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  fileName: string;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob, croppedPreviewUrl: string) => void;
}

export function ImageCropModal({
  isOpen,
  imageSrc,
  fileName,
  onClose,
  onCropComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (location: { x: number; y: number }) => {
    setCrop(location);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleConfirmCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedPreviewUrl = URL.createObjectURL(croppedBlob);
      onCropComplete(croppedBlob, croppedPreviewUrl);
      onClose();
    } catch (err: any) {
      console.error("Error cropping image:", err);
      toast.error("Failed to crop image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!imageSrc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <DialogContent className="max-w-xl w-[95vw] bg-neutral-900 border border-white/10 rounded-[28px] text-white p-6 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="mb-3 flex-shrink-0">
          <DialogTitle className="font-display text-lg uppercase tracking-wider text-white flex items-center gap-2">
            <Move className="w-4 h-4 text-brand" /> Adjust Image Crop
          </DialogTitle>
          <DialogDescription className="text-white/60 text-xs">
            Drag to position and zoom photo to fit the 4:3 Guest Story card frame ({fileName}).
          </DialogDescription>
        </DialogHeader>

        {/* Cropper Container - Fixed 4:3 Aspect Frame Preview */}
        <div className="relative w-full aspect-[4/3] bg-black/80 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={handleCropComplete}
            showGrid={true}
            style={{
              containerStyle: { width: "100%", height: "100%", borderRadius: "1rem" },
              cropAreaStyle: {
                border: "2px solid #00E599",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.65)",
              },
            }}
          />
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center justify-between gap-4 mt-4 px-2 flex-shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setZoom((prev) => Math.max(1, prev - 0.2))}
              disabled={zoom <= 1}
              className="h-8 w-8 rounded-full border-white/10 bg-black/40 text-white hover:bg-white/10"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand"
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setZoom((prev) => Math.min(3, prev + 0.2))}
              disabled={zoom >= 3}
              className="h-8 w-8 rounded-full border-white/10 bg-black/40 text-white hover:bg-white/10"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 px-3 py-1.5"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/10 mt-4 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 border-white/10 text-white/80 hover:text-white rounded-full uppercase tracking-wider text-xs py-2.5"
          >
            <X className="w-3.5 h-3.5 mr-1" /> Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirmCrop}
            disabled={isProcessing}
            className="flex-1 bg-brand hover:bg-brand/90 text-white font-semibold rounded-full uppercase tracking-wider text-xs py-2.5 shadow-lg shadow-brand/10"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 mr-1" /> Apply Crop
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
