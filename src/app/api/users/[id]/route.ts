import { deleteUserFromDatabase, getUserByIdFromDatabase, updateUserInDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET (
  req: Request,
  res: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = res.params
    const user = await getUserByIdFromDatabase(id)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}

export async function PUT (
  _req: Request,
  res: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = res.params
    const req = await _req.json()
    const userUpdated = await updateUserInDatabase(id, req)
    return NextResponse.json({ userUpdated }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}

export async function DELETE (req: any, res: any) {
  try {
    const { id } = res.params
    await deleteUserFromDatabase(id)
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
