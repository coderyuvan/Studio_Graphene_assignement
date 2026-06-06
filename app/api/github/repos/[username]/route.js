import { NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/githubCache'
import { fetchGitHubRepos } from '@/lib/github'

export async function GET(request, { params }) {
  const { username } = await params
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || 1

  const cacheKey = `repos:${username}:${page}`
  const cached = getCache(cacheKey)
  if (cached) {
    return NextResponse.json({ repos: cached, fromCache: true })
  }

  try {
    const repos = await fetchGitHubRepos(username, page)
    setCache(cacheKey, repos)
    return NextResponse.json({ repos })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}