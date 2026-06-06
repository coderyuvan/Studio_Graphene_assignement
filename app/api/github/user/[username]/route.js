import { NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/githubCache'
import { fetchGitHubUser } from '@/lib/github'

export async function GET(request, { params }) {
  const { username } = await params

  const cached = getCache(`user:${username}`)
  if (cached) {
    return NextResponse.json({ ...cached, fromCache: true })
  }

  try {
    const user = await fetchGitHubUser(username)
    setCache(`user:${username}`, user)
    return NextResponse.json(user)
  } catch (error) {
    const status = error.message === 'User not found' ? 404 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}