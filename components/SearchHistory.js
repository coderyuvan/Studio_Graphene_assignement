export default function SearchHistory({ history, onSelect }) {
  return (
    <div className="w-full max-w-md">
      <p className="text-zinc-700 text-xs uppercase tracking-widest mb-3">Recent searches</p>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item._id}
            onClick={() => onSelect(item.username)}
            className="text-sm bg-white/[0.03] border border-white/[0.07] text-zinc-500 px-3 py-1.5 rounded-lg hover:text-white hover:border-white/20 transition-colors"
          >
            {item.username}
          </button>
        ))}
      </div>
    </div>
  )
}