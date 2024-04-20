import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('MongoDB connection string is required');
}

console.log(connectionString)

export default mongoose.createConnection(connectionString);