import { getProductsByUserId } from '@/lib/mongo'
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
