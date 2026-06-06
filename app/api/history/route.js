import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import SearchHistory from '@/models/SearchHistory'

// GET - fetch user's recent searches
export async function GET() {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const history = await SearchHistory.find({ userId })
    .sort({ searchedAt: -1 })
    .limit(10)

  return NextResponse.json(history)
}

// POST - save a search
export async function POST(request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { username } = await request.json()
  await connectDB()

  // Avoid duplicates — just update timestamp if already exists
  await SearchHistory.findOneAndUpdate(
    { userId, username },
    { searchedAt: new Date() },
    { upsert: true }
  )

  return NextResponse.json({ success: true })
}