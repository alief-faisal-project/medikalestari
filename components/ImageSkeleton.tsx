"use client";

import React from "react";

interface ImageSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width = "w-full",
  height = "h-full",
  className = "",
}) => {
  return (
    <div
      className={`${width} ${height} ${className} bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse rounded`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 2s infinite",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

interface CardSkeletonProps {
  count?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-card-${count}-${idx}`}
          className="h-105 w-full overflow-hidden bg-white shadow-xl border border-slate-100 rounded animate-pulse"
        >
          <ImageSkeleton height="h-full" />
        </div>
      ))}
    </div>
  );
};

interface PartnerSkeletonProps {
  count?: number;
}

export const PartnerSkeleton: React.FC<PartnerSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-partner-${count}-${idx}`}
          className="flex items-center justify-center p-4 border border-slate-100 rounded-xl bg-white shadow-sm h-32"
        >
          <ImageSkeleton className="w-24 h-24" />
        </div>
      ))}
    </div>
  );
};
