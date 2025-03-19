import { Request, Response } from "express";
import { Permissions } from "@open-ic/openchat-botclient-ts";

export default function schema(_: Request, res: Response) {
  res.status(200).json({
    description: "This is a test bot",
    commands: [
      {
        name: "ping",
        default_role: "Participant",
        description: "Say pong",
        permissions: Permissions.encodePermissions({
          chat: [],
          community: [],
          message: ["Text"],
        }),
        params: [],
      },
    ],
  });
}
