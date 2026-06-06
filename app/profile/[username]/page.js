'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import UserCard from '@/components/UserCard'
import RepoList from '@/components/RepoList'
import SkeletonLoader from '@/components/SkeletonLoader'

export default function ProfilePage() {
  const { username } = useParams()
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reposLoading, setReposLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('updated') // 'updated' | 'stars' | 'name'

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/github/user/${username}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [username])

  useEffect(() => {
    if (!user) return
    setReposLoading(true)

    fetch(`/api/github/repos/${username}?page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        if (page === 1) {
          setRepos(data.repos)
        } else {
          setRepos((prev) => [...prev, ...data.repos])
        }
        setHasMore(data.repos.length === 30)
        setReposLoading(false)
      })
      .catch(() => setReposLoading(false))
  }, [user, page])

  function getSortedRepos() {
    const sorted = [...repos]
    if (sortBy === 'stars') return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    if (sortBy === 'name') return sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted // 'updated' — already sorted by API
  }

  if (loading) return <SkeletonLoader />

  if (error) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <p className="text-2xl text-red-400 mb-4">{error}</p>
        <button onClick={() => router.push('/')} className="text-zinc-400 underline">
          ← Go back
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 max-w-4xl mx-auto">
      <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white mb-8 block">
        ← Back to search
      </button>

      <UserCard user={user} />

      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Repositories ({repos.length})</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="updated">Sort: Last Updated</option>
            <option value="stars">Sort: Stars</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <RepoList repos={getSortedRepos()} />

        {hasMore && (
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={reposLoading}
            className="mt-8 w-full py-3 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-white transition-colors disabled:opacity-50"
          >
            {reposLoading ? 'Loading...' : 'Load more repos'}
          </button>
        )}
      </div>
    </main>
  )
}