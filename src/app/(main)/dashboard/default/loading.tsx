export default function Loading() {
  return (
    <div className="fixed left-4 top-4 z-[9999]">
      <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-sm shadow">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-medium">Chờ một chút…</span>
      </div>
    </div>
  );
}
