import express from "express";

import { serveClient } from "./serve-client";
import { serveWs } from "./serve-ws";
import { reloadOnChange } from "./reload-on-change";
import { setupServer } from "./setup-server";

const app = express();
const ws = serveWs();

reloadOnChange(ws);
serveClient(app);
setupServer(app);
