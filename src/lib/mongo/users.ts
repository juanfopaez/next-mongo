import { ObjectId } from 'mongodb'
import { clientPromise } from '.'

export const getUsersFromDatabase = async () => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('users')
  const users = await collection.find().toArray()
  return users
}

export const getUserByIdFromDatabase = async (userId: string): Promise<any> => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('users')
  const user = await collection.findOne({ _id: new ObjectId(userId) })
  return user
}

export const addUserToDatabase = async (user: any): Promise<void> => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('users')
  await collection.insertOne(user)
}

export const updateUserInDatabase = async (userId: string, updatedUser: any): Promise<void> => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('users')
  await collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser })
}

export const deleteUserFromDatabase = async (userId: string): Promise<void> => {
  const client = await clientPromise
  const db = client.db('ucentral')
  const collection = db.collection('users')
  await collection.deleteOne({ _id: new ObjectId(userId) })
}
