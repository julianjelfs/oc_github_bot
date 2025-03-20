import { Request, Response } from "express";
import { WithBotClient } from "../types";

function hasBotClient(req: Request): req is WithBotClient {
  return (req as WithBotClient).botClient !== undefined;
}

export default async function prCreated(req: Request, res: Response) {
  if (!hasBotClient(req)) {
    res.status(500).send("Bot client not initialised");
    return;
  }

  const { title, url, author, repo } = req.body as {
    title: string;
    url: string;
    author: string;
    repo: string;
  };

  const client = req.botClient;

  const msg = (
    await client.createTextMessage(
      `
      ## A PR has been created in the ${repo} repository by ${author}
      
      [${title}](${url})
      `
    )
  ).setFinalised(true);

  client
    .sendMessage(msg)
    .catch((err) => console.error("sendMessage failed with: ", err));

  res.sendStatus(200);
}
