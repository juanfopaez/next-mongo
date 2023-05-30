import { deleteProductFromDatabase, getProductById, updateProductInDatabase } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET (req: any, res: any) {
  try {
    const { idProduct } = res.params
    const product = await getProductById(idProduct)
    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {

  }
}

export async function PUT (_req: any, res: any) {
  try {
    const { idProduct } = res.params
    const req = await _req.json()
    const productUpdated = await updateProductInDatabase(idProduct, req)
    return NextResponse.json({ productUpdated }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}

export async function DELETE (req: any, res: any) {
  try {
    const { idProduct } = res.params
    await deleteProductFromDatabase(idProduct)
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 })
  }
}
