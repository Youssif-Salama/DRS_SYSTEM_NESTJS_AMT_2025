import { createServer, proxy } from 'aws-serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, expressApp);
    await app.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
