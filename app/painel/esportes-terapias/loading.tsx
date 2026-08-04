import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-6 w-56 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-12 gap-4">
          <Skeleton className="col-span-6 h-5" />
          <Skeleton className="col-span-3 h-5" />
          <Skeleton className="col-span-3 h-5" />
        </div>
        
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-slate-100 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="col-span-3">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="col-span-3 flex justify-end gap-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
