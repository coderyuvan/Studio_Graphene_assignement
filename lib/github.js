const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

export async function fetchGitHubUser(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, { headers });
  if (!res.ok) throw new Error(`GitHub user not found: ${username}`);
  return res.json();
}

export async function fetchGitHubRepos(username) {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=30`,
    { headers }
  );
  if (!res.ok) throw new Error(`Could not fetch repos for: ${username}`);
  return res.json();
}
