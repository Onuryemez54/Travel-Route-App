import { rest, RestHandler } from "msw";
import type { ResponseComposition, RestContext, RestRequest } from "msw";
import { setupServer } from "msw/node";

type HandlerConfig = {
  method: "get";
  path: string;
  res: (req: RestRequest, res: ResponseComposition, ctx: RestContext) => any;
};

export const createServer = (handlerConfigs: HandlerConfig[]) => {
  const handlers: RestHandler[] = handlerConfigs.map((config) =>
    rest[config.method](config.path, (req, res, ctx) => {
      const result = config.res(req, res, ctx);
      return res(ctx.json(result));
    })
  );

  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};
