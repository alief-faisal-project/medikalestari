import { Suspense } from "react";
import SearchContent from "./SearchContent";

const SearchLoadingFallback = () => (
  <div className="fixed inset-0 md:static md:min-h-screen bg-white md:bg-gray-50 z-[120] overflow-hidden md:overflow-visible flex flex-col">
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm md:hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0 p-1.5 w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto md:overflow-visible p-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  </div>
);

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchContent />
    </Suspense>
  );
}
