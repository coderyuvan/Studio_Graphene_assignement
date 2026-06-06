import RepoCard from './RepoCard'

export default function RepoList({ repos }) {
  if (repos.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-600">
        No repositories found.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}