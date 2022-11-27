import dotenv from 'dotenv';

// loads env vars defined in .env file
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const PORT = process.env.PORT;
