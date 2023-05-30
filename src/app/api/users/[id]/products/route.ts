import { addProductToDatabase, getProductsByUserId } from '@/lib/mongo'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET (
  req: Request,
  res: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = res.params
    const products = await getProductsByUserId(id)
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}

export async function POST (_req: any, res: any) {
  try {
    const req = await _req.json()
    const product = await addProductToDatabase({ ...req.data, _idUser: new ObjectId(req.userId) })
    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
