import { Request, Response } from "express";
import { Permissions } from "@open-ic/openchat-botclient-ts";

export default function schema(_: Request, res: Response) {
  res.status(200).json({
    description:
      "This bot will act as a webhook to accept a PR notification from github and post it to a chat.",
    commands: [],
    autonomous_config: {
      sync_api_key: true,
      permissions: Permissions.encodePermissions({
        message: ["Text"],
        community: [],
        chat: [],
      }),
    },
  });
}
