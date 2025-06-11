import { registerAs } from '@nestjs/config';
import * as env from 'dotenv';
import * as path from 'path';

export default registerAs('envConfig', () => {
  let nodeEnv = process.env.NODE_ENV;
  if (nodeEnv == 'prod') {
    env.config({ path: path.resolve(__dirname, '../../.env.prod') });
  } else {
    env.config({ path: path.resolve(__dirname, '../../.env.dev') });
  }
  return {
    system: {
      node_env: process.env.NODE_ENV,
      port: process.env.PORT || 3000,
    },
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      reciever: process.env.EMAIL_RECIEVER,
    },
    jwt: {
      pass: process.env.JWT_PASS,
    },
    bcrypt: {
      salting: process.env.BCRYPT_SALTING,
    },
    db: {
      type: process.env.DB_TYPE,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
    },
  };
});
