import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export default function HomesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-gray-400">
          Đang tải…
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
