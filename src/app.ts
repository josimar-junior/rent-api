import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import routes from './routes';

import { createConnection } from 'typeorm';

import './app/shared/container';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private async database() {
    try {
      await createConnection()
    } catch (err) {
      console.error(err);
    }
  }
}

export default new App().server;
