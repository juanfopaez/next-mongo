import { getUsersFromDatabase, addUserToDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET (req: any): Promise<NextResponse> {
  try {
    const users = await getUsersFromDatabase()
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}

export async function POST (req: any): Promise<NextResponse> {
  try {
    const res = await req.json()
    const user = await addUserToDatabase(res)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
