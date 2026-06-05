// Saves + fetches search history
export async function GET(request) {
  // TODO: fetch search history from DB
  return Response.json({ history: [] });
}

export async function POST(request) {
  // TODO: save search entry to DB
  const body = await request.json();
  return Response.json({ saved: true, entry: body });
}
