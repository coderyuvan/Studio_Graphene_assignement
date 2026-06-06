export default function SkeletonLoader() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 max-w-4xl mx-auto">
      <div className="animate-pulse">
        <div className="flex gap-6 p-6 bg-zinc-900 rounded-2xl">
          <div className="w-24 h-24 bg-zinc-800 rounded-full" />
          <div className="flex-1 space-y-3 py-2">
            <div className="h-6 bg-zinc-800 rounded w-48" />
            <div className="h-4 bg-zinc-800 rounded w-32" />
            <div className="h-4 bg-zinc-800 rounded w-64" />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-zinc-900 rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  )
}