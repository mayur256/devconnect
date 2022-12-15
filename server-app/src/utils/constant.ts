import dotenv from 'dotenv';

// loads env vars defined in .env file
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const PORT = process.env.PORT;
export const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error'
};
export const STATUS_CODE = {
    OK: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500
};
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const FRONT_URL = process.env.FRONT_URL;
export const SECRET = process.env.SECRET as string;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_FROM = process.env.MAIL_FROM;
