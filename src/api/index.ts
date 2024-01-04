import express, { Request, Response, json } from "express";
import asyncHandler from "express-async-handler";

import { logger } from "../common/logger";
import { extractErrorMessage } from "../common/utils";

import cosign from "./endpoints/cosign";

const protect = async (
  req: Request,
  res: Response,
  paramsIn: "query" | "body",
  fn: (req: Request, res: Response, paramsIn: "query" | "body") => Promise<any>
) => {
  try {
    await fn(req, res, paramsIn);
  } catch (error: any) {
    res.status(500).send({
      error: extractErrorMessage(error),
    });
  }
};

export const start = async () => {
  const app = express();
  app.use(json({ limit: "50mb" }));

  // GET

  app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.send({
        error: "auth failed"
      })
    }
    if (apiKey != process.env.AUTH_KEY) {
      return res.send({
        error: "auth failed"
      })
    } else {
      next();
    }
  })

  app.get(
    "/",
    asyncHandler(async (_req, res) => {
      res.json({ message: "Success" });
    })
  );

  // POST

  app.post(
    "/eth/cosign",
    asyncHandler(async (req, res) =>
      protect(req, res, "body", cosign)
    )
  );

  const port = Number(process.env.PORT!);
  app.listen(port, () => {
    logger.info("process", `Started on port ${port}`);
  });
};
