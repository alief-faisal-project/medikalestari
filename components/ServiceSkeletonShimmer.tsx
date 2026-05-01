"use client";

import React from "react";

const ServiceSkeletonShimmer = () => {
  return (
    <>
      <style>{`
        @keyframes shimmer-animation {
          0% {
            background-position: -1200px 0;
          }
          100% {
            background-position: 1200px 0;
          }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            #f1f5f9 0%,
            #e2e8f0 50%,
            #f1f5f9 100%
          );
          background-size: 1200px 100%;
          animation: shimmer-animation 2s infinite;
        }

        .skeleton-rounded {
          border-radius: 0.5rem;
        }
      `}</style>

      <div className="relative aspect-3/4.5 flex flex-col overflow-hidden bg-white border border-slate-200 shadow-sm">
        {/* Image skeleton shimmer */}
        <div className="absolute inset-0">
          <div className="w-full h-full skeleton-shimmer" />
        </div>

        {/* Gradasi overlay skeleton */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-linear-to-t from-slate-300 via-slate-250 to-transparent z-10" />

        {/* Content skeleton area */}
        <div className="relative z-20 mt-auto p-7 flex flex-col items-start w-full gap-4">
          {/* Title skeleton */}
          <div className="w-3/4 h-7 skeleton-shimmer skeleton-rounded" />

          {/* Description skeleton */}
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full h-3 skeleton-shimmer skeleton-rounded" />
            <div className="w-5/6 h-3 skeleton-shimmer skeleton-rounded" />
            <div className="w-4/5 h-3 skeleton-shimmer skeleton-rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSkeletonShimmer;
