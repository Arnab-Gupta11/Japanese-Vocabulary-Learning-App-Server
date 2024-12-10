import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  jwt_secret: process.env.JWT_SECRETE,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
};
