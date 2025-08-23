import dotenv from 'dotenv';

dotenv.config();

export const ENV ={ //here we are exporting the env variables so that we can use it in other files
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV
}