import {
  BadRequestError,
  BotClientFactory,
} from "@open-ic/openchat-botclient-ts";
import { NextFunction, Request, Response } from "express";
import { WithBotClient } from "./types";

export function createApiKeyBotClient(factory: BotClientFactory) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiKey = req.headers["x-api-key"];
      if (typeof apiKey !== "string") {
        res.status(400).send("Request header x-api-key not found");
      } else {
        (req as WithBotClient).botClient =
          factory.createClientFromApiKey(apiKey);
        console.log("Bot client created");
        next();
      }
    } catch (err: any) {
      console.log("Error creating bot client: ", err);
      if (err instanceof BadRequestError) {
        res.status(400).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
    }
  };
}
