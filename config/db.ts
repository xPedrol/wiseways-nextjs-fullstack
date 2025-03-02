import mongoose, { ConnectOptions } from 'mongoose'

const { MONGODB_URI } = process.env

export const connectDB = async (): Promise<boolean> => {
  try {
    if (mongoose.connections[0]?.readyState === 1) {
      return true
    }

    const options: ConnectOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
    const { connection } = await mongoose.connect(
      MONGODB_URI as string,
      options,
    )

    if (connection.readyState === 1) {
      return true
    } else {
      throw new Error('Failed to establish database connection')
    }
  } catch (error) {
    throw error
  }
}
