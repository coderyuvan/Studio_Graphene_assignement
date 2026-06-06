'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import SearchHistory from '@/components/SearchHistory'

export default function HomePage() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch('/api/history')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setHistory(data))
      .catch(() => {})
  }, [])

  function handleSearch(username) {
    if (!username.trim()) return
    fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim() }),
    })
    router.push(`/profile/${username.trim()}`)
  }

  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* purple glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* top right user button */}
      <div className="absolute top-4 right-4 z-10">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* badge */}
      <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-full mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        GitHub Profile Explorer
      </div>

      {/* heading */}
      <h1 className="text-5xl sm:text-6xl font-medium text-white text-center leading-tight tracking-tight mb-4">
        Explore any<br />
        <span className="text-indigo-400">GitHub profile</span>
      </h1>

      <p className="text-zinc-500 text-center max-w-sm mb-10 leading-relaxed">
        Search any GitHub username to explore their public repositories, contributions, and more.
      </p>

      {/* search bar */}
      <div className="relative w-full max-w-md mb-3">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">
          ⌕
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
          placeholder="Enter a GitHub username..."
          className="w-full bg-white/[0.04] border border-white/10 text-white rounded-2xl pl-10 pr-32 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-600"
        />
        <button
          onClick={() => handleSearch(value)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
        >
          Search
        </button>
      </div>

      {/* quick suggestions */}
      <p className="text-zinc-700 text-xs mb-12">
        Try{' '}
        {['torvalds', 'gaearon', 'sindresorhus'].map((u) => (
          <button
            key={u}
            onClick={() => handleSearch(u)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors mx-1"
          >
            {u}
          </button>
        ))}
      </p>

      {/* stats row */}
      <div className="flex items-center gap-8 mb-12">
        {[
          { num: '100M+', label: 'GitHub users' },
          { num: '60s', label: 'Cache TTL' },
          { num: '30', label: 'Repos per page' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-xl font-medium text-white">{s.num}</div>
            <div className="text-xs text-zinc-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* recent searches */}
      {history.length > 0 && (
        <SearchHistory history={history} onSelect={handleSearch} />
      )}
    </main>
  )
}