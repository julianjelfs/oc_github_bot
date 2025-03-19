import "dotenv/config";
import cors from "cors";
import express from "express";
import schema from "./handlers/schema";
import prCreated from "./handlers/prCreated";
import { BotClientFactory } from "@open-ic/openchat-botclient-ts";
import { createApiKeyBotClient } from "./createClient";

const app = express();
const PORT = process.env.PORT || 3000;

const factory = new BotClientFactory({
  identityPrivateKey: process.env.IDENTITY_PRIVATE!,
  icHost: process.env.IC_HOST!,
  openchatPublicKey: process.env.OC_PUBLIC!,
  openStorageCanisterId: process.env.STORAGE_INDEX_CANISTER!,
});

app.use(express.json());
app.use(cors());
app.get("/bot_definition", schema);
app.get("/", schema);
app.post("/pr_created", createApiKeyBotClient(factory), prCreated);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
