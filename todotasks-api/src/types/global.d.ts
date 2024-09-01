export type Schema = any;

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}