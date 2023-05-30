import { getUsersFromDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET (request: any):Promise<NextResponse> {
  try {
    const users = await getUsersFromDatabase()
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
