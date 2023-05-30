import { ObjectId } from 'mongodb'
import { clientPromise } from '.'

export const getProductsByUserId = async (userId: string) => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('products')
  const products = await collection.find({ _idUser: new ObjectId(userId) }).toArray()
  return products
}

export const deleteProductFromDatabase = async (productId: string): Promise<void> => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('products')
  await collection.deleteOne({ _id: new ObjectId(productId) })
}
