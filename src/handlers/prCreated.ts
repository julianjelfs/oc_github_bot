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
  client
    .sendMessage(
      (
        await client.createTextMessage(
          `A PR has been created in the **${repo}** repository by **@${author}**\n\n**[${title}](${url})**`
        )
      ).setFinalised(true)
    )
    .catch((err) => console.error("sendMessage failed with: ", err));

  res.sendStatus(200);
}
