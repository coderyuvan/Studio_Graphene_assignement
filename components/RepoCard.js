'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false)

  const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <div
      className="p-5 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{repo.name}</h3>
          {repo.description && (
            <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{repo.description}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-zinc-500">
            {repo.language && (
              <span className="text-zinc-300">● {repo.language}</span>
            )}
            <span>⭐ {repo.stargazers_count}</span>
            <span>Updated {updatedAt}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            window.open(repo.html_url, '_blank')
          }}
          className="text-xs border border-zinc-700 px-3 py-1.5 rounded-lg hover:border-white transition-colors shrink-0"
        >
          View
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-2 text-sm text-zinc-400">
          <span>🐛 Open issues: <strong className="text-white">{repo.open_issues_count}</strong></span>
          <span>🌿 Branch: <strong className="text-white">{repo.default_branch}</strong></span>
          <span>👁 Watchers: <strong className="text-white">{repo.watchers_count}</strong></span>
          <span>🍴 Forks: <strong className="text-white">{repo.forks_count}</strong></span>
        </div>
      )}
    </div>
  )
}