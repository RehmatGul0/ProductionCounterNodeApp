import "reflect-metadata";
import { Server } from "http";
import bodyParser from "body-parser";
import express from 'express';
import { Response, Request, NextFunction } from "express";
import bunyanMiddleware from "express-bunyan-logger";
import helmet from "helmet";
import { useExpressServer, useContainer as routingUseContainer } from "routing-controllers";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Container, Service } from "typedi";
import config from "./config";
import { ErrorHandler } from './middleware/errorHandler';
import { logger } from "./utils";
import { MongooseService, SocketService } from "./services";
import  { Server as SocketServer }  from 'socket.io';

@Service()
export class App {
  public readonly expressApplication: express.Application;
  private swaggerDoc: unknown;
  private socket: SocketServer;
  constructor(
      private readonly mongooseService: MongooseService,
      private readonly socketService: SocketService
  ) {
      this.expressApplication = express();

      this.initializeMiddleware();
      this.configureSwagger();
      this.initializeSwagger()
      this.configureDependencyInjection()
      this.initializeControllers();
  }

  private initializeMiddleware(): void {
      this.expressApplication.use(helmet());
      this.expressApplication.use(bodyParser.json());

      if (config.env !== 'test') {
          this.expressApplication.use(bunyanMiddleware({
              logger,
              parseUA: false,
              excludes: ['response-hrtime', 'req-headers', 'res-headers'],
              format: ':incoming :method :url :status-code',
          }));
      }
  }

  private configureSwagger(): void {
      this.swaggerDoc = swaggerJSDoc({
          definition: {
              openapi: '3.0.0',
              info: {
                  title: 'Swagger Examples',
                  version: '1.0.0',
              },
          },
          apis: ['./src/spec/*.yml', './src/spec/components/*.yml'],
      });
  }

  private initializeSwagger(): void {
      this.expressApplication.use('/docs', swaggerUI.serve);
      this.expressApplication.get('/docs', swaggerUI.setup(this.swaggerDoc));
  }

  private configureDependencyInjection(): void {
      routingUseContainer(Container);
  }

  private initializeControllers(): void {
      useExpressServer(this.expressApplication, {
          controllers: [__dirname + "/controllers/*.ts"],
          middlewares: [ErrorHandler],
          defaultErrorHandler: false,
      });
  }
  
  public async startExpressServer(): Promise<Server> {
      const connection = await this.mongooseService.createConnection();
      const server = await this.expressApplication.listen(config.server.port);

      if (connection) {
          logger.info(`Hey! I'm connected to database...`);
      }

      if (server) {
          logger.info(`Hey! I'm listening on port: ${config.server.port} ... API Documentation is available at /docs`);
          this.socket = this.socketService.createSocketConnection(server);
          if( this.socket ) {
            logger.info(`Hey Socket here! I'm listening on port: ${config.server.port}`);
          }
      }
      return server;
  }

  public getSocket(): SocketServer {
      return this.socket;
  }
}
