const GITHUB_API = 'https://api.github.com'

const headers = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
}

export async function fetchGitHubUser(username) {
  const url = `${GITHUB_API}/users/${username}`
  console.log('Fetching GitHub user:', url)
  console.log('Token present:', !!process.env.GITHUB_TOKEN)

  const res = await fetch(url, { headers })
  console.log('GitHub response status:', res.status)

  if (res.status === 404) throw new Error('User not found')
  if (res.status === 403) throw new Error('GitHub rate limit exceeded')
  if (!res.ok) throw new Error('GitHub API error')
  return res.json()
}

export async function fetchGitHubRepos(username, page = 1) {
  const url = `${GITHUB_API}/users/${username}/repos?per_page=30&page=${page}&sort=updated`
  console.log('Fetching GitHub repos:', url)

  const res = await fetch(url, { headers })
  console.log('GitHub repos status:', res.status)

  if (!res.ok) throw new Error('Failed to fetch repositories')
  return res.json()
}