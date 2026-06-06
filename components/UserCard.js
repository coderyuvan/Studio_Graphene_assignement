export default function UserCard({ user }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full border-2 border-zinc-700"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
        <p className="text-zinc-400 text-sm mt-1">@{user.login}</p>
        {user.bio && <p className="text-zinc-300 mt-2">{user.bio}</p>}
        <div className="flex gap-4 mt-4 text-sm text-zinc-400">
          <span><strong className="text-white">{user.followers}</strong> followers</span>
          <span><strong className="text-white">{user.following}</strong> following</span>
          <span><strong className="text-white">{user.public_repos}</strong> repos</span>
        </div>
      </div>

      <button
        onClick={() => window.open(user.html_url, '_blank')}
        className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:border-white transition-colors"
      >
        View on GitHub →
      </button>
    </div>
  )
}