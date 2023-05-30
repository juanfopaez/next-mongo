import { getUserByIdFromDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET (req: Request, res: { params: { id: string } }):Promise<NextResponse> {
  try {
    const { id } = res.params
    const user = await getUserByIdFromDatabase(id)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
