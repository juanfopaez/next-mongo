import { deleteProductFromDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function DELETE (req: any, res: any) {
  try {
    const { idProduct } = res.params
    await deleteProductFromDatabase(idProduct)
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
