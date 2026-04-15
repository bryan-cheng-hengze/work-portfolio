import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoadingChange?: (loading: boolean) => void;
};

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  className = "",
  style = {},
  onLoadingChange,
}) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
    onLoadingChange?.(false);
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <Skeleton className="absolute inset-0 w-full h-full z-50 rounded-2xl" />
      )}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 select-none image-smooth ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          ...style,
        }}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default SkeletonImage;
