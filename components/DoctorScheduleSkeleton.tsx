"use client";

import React, { useMemo } from "react";

export default function DoctorScheduleSkeleton() {
  // Generate stable keys for skeleton items
  const filterIds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `filter-${i}`),
    [],
  );
  const headerIds = useMemo(
    () => Array.from({ length: 9 }, (_, i) => `header-${i}`),
    [],
  );
  const rowIds = useMemo(
    () => Array.from({ length: 6 }, (_, i) => `row-${i}`),
    [],
  );
  const legendIds = useMemo(
    () => Array.from({ length: 2 }, (_, i) => `legend-${i}`),
    [],
  );

  // Helper function untuk menentukan width
  const getColumnWidth = (colIdx: number): string => {
    if (colIdx === 0) return "w-32";
    if (colIdx === 1) return "w-24";
    return "w-12";
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar Skeleton */}
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full h-12 rounded-lg bg-slate-200 animate-pulse"></div>
        </div>

        {/* Filter Buttons Skeleton */}
        <div className="flex flex-wrap gap-2">
          {filterIds.map((id) => (
            <div
              key={id}
              className="h-10 w-24 rounded-lg bg-slate-200 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse min-w-80">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {headerIds.map((id) => (
                <th
                  key={id}
                  className="py-4 px-6 text-left font-bold text-slate-800 text-sm border-r border-slate-200 last:border-r-0"
                >
                  <div className="h-4 w-12 bg-slate-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowIds.map((rowId, rowIdx) => (
              <React.Fragment key={rowId}>
                <tr className="border-b border-slate-200 bg-white hover:bg-blue-50 transition-colors">
                  {Array.from({ length: 9 }).map((_, colIdx) => (
                    <td
                      key={`${rowId}-col-${colIdx}`}
                      className="py-4 px-6 text-sm border-r border-slate-200 last:border-r-0"
                    >
                      <div
                        className={`h-4 ${getColumnWidth(colIdx)} bg-slate-200 rounded animate-pulse`}
                      ></div>
                    </td>
                  ))}
                </tr>
                {/* Occasional second row for variation */}
                {rowIdx % 3 === 1 && (
                  <tr className="border-b border-slate-200 bg-blue-50/30">
                    <td colSpan={2} className="py-2 px-6">
                      <div className="h-3 w-16 bg-slate-200 rounded animate-pulse"></div>
                    </td>
                    {Array.from({ length: 7 }).map((_, colIdx) => (
                      <td
                        key={`${rowId}-extra-col-${colIdx}`}
                        className="py-3 px-6 text-sm border-r border-slate-200 last:border-r-0"
                      >
                        <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend Skeleton */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="h-4 w-20 bg-slate-300 rounded animate-pulse mb-3"></div>
        <div className="space-y-2">
          {legendIds.map((id) => (
            <div
              key={id}
              className="h-3 w-48 bg-slate-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
