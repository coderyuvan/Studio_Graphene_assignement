# GitHub Repo Explorer

A full-stack web application where users can search any GitHub username and explore their public profile and repositories. Built as part of the Studio Graphene Full Stack Developer Assessment (Exercise 3).

The app proxies all GitHub API calls through a Node.js backend (Next.js API routes) to handle caching, rate limiting, and secure token management. Search history is persisted to MongoDB per authenticated user via Clerk.

---

## Live Demo

https://studio-graphene-assignement.vercel.app/

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 15 (App Router) | File-based routing, server + client components, API routes in one project |
| Styling | Tailwind CSS | Utility-first, fast to build, easy to keep consistent |
| Auth | Clerk | Handles sign-in/sign-up out of the box, easy Next.js integration |
| Database | MongoDB Atlas + Mongoose | Simple to set up, great for storing lightweight search history |
| HTTP | Axios / fetch | Built-in fetch used for simplicity |
| Deployment | Vercel | Native Next.js support, free tier, easy env var management |

---

## How to Run Locally

> Assumes you have Node.js installed. Clone the repo first.

```bash
# 1. Clone the repo
git clone https://github.com/coderyuvan/Studio_Graphene_assignement.git
cd Studio_Graphene_assignement

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Then fill in your keys (see below)

# 4. Start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Required Environment Variables

Create a `.env.local` file in the root with these values:

```env
# Clerk — get from clerk.com → your app → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
CLERK_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# MongoDB — get from MongoDB Atlas → your cluster → Connect
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/github-explorer

# GitHub — get from GitHub → Settings → Developer Settings → Personal Access Tokens
# Optional but recommended to avoid 60 req/hour rate limit
GITHUB_TOKEN=ghp_xxxx
```

---

## API Documentation

All routes are under `/api/`.



---

### `GET /api/github/user/[username]`
Proxies the GitHub user profile endpoint. Caches response for 60 seconds.

**Example:** `GET /api/github/user/torvalds`

**Response (200)**
```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "avatar_url": "https://...",
  "bio": "...",
  "followers": 230000,
  "following": 0,
  "public_repos": 8
}
```

**Response (404)**
```json
{ "error": "User not found" }
```

**Response (403)**
```json
{ "error": "GitHub rate limit exceeded" }
```

---

### `GET /api/github/repos/[username]?page=1`
Proxies the GitHub repos endpoint. Returns 30 repos per page. Caches per username+page for 60 seconds.

**Query Params**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number for pagination |

**Example:** `GET /api/github/repos/torvalds?page=1`

**Response (200)**
```json
{
  "repos": [
    {
      "id": 123,
      "name": "linux",
      "description": "Linux kernel source tree",
      "language": "C",
      "stargazers_count": 180000,
      "updated_at": "2024-01-01T00:00:00Z",
      "open_issues_count": 300,
      "default_branch": "master",
      "forks_count": 50000,
      "html_url": "https://github.com/torvalds/linux"
    }
  ],
  "fromCache": false
}
```

---

### `GET /api/history`
Returns the last 10 searches for the authenticated user.

**Auth:** Requires Clerk session

**Response (200)**
```json
[
  { "_id": "abc", "username": "torvalds", "searchedAt": "2024-01-01T00:00:00Z" },
  { "_id": "def", "username": "gaearon",  "searchedAt": "2024-01-01T00:00:00Z" }
]
```

---

### `POST /api/history`
Saves a searched username for the authenticated user. Upserts so no duplicates.

**Auth:** Requires Clerk session

**Request Body**
```json
{ "username": "torvalds" }
```

**Response (200)**
```json
{ "success": true }
```

---

## Project Structure

```
github-repo-explorer/
├── app/
│   ├── layout.js                        # ClerkProvider, global layout
│   ├── page.js                          # Home — search bar + recent history
│   ├── health/
│   │   └── page.js                      # Connection health check UI
│   ├── profile/
│   │   └── [username]/
│   │       └── page.js                  # Profile + repos page
│   ├── sign-in/[[...sign-in]]/
│   │   └── page.js                      # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/
│   │   └── page.js                      # Clerk sign-up page
│   └── api/
│       ├── health/route.js              # Connection health check endpoint
│       ├── github/
│       │   ├── user/[username]/route.js # Proxy: GitHub user profile
│       │   └── repos/[username]/route.js# Proxy: GitHub repositories
│       └── history/route.js            # GET + POST search history
│
├── components/
│   ├── SearchBar.js                     # Controlled search input
│   ├── UserCard.js                      # Avatar, name, bio, stats
│   ├── RepoCard.js                      # Repo row, expandable details
│   ├── RepoList.js                      # Maps over repos, empty state
│   ├── SearchHistory.js                 # Recent search chips
│   └── SkeletonLoader.js               # Loading skeleton
│
├── lib/
│   ├── mongodb.js                       # Singleton Mongoose connection
│   ├── githubCache.js                   # In-memory TTL cache (60s)
│   └── github.js                        # GitHub API fetch helpers
│
├── models/
│   └── SearchHistory.js                 # Mongoose schema for search history
│
├── proxy.js                             # Clerk auth middleware
├── .env.local                           # Local environment variables (not committed)
├── .env.example                         # Template for env vars
└── README.md
```

---

## Next Steps

- **Aceternity UI** — add Spotlight and CardHoverEffect components to make the landing page and repo list more visually polished
- **Language breakdown chart** — a simple pie chart using Recharts showing languages used across all public repos
- **Debounced search as you type** — search triggers automatically after a short delay instead of requiring a button press

