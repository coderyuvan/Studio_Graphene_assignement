// Proxies GitHub user API
export async function GET(request, { params }) {
  // TODO: fetch user from GitHub and return
  return Response.json({ username: params.username });
}
