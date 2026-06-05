// Proxies GitHub repos API
export async function GET(request, { params }) {
  // TODO: fetch repos from GitHub and return
  return Response.json({ username: params.username, repos: [] });
}
