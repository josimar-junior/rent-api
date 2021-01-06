import express from 'express';
import cors from 'cors';

import routes from './routes';

import { createConnection } from 'typeorm';

import "reflect-metadata";

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    createConnection();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
