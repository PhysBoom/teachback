import express from "express";
import path from "path";
import { getEnvVar } from "./getEnvVar.js";
import { connectMongo } from "./connectMongo.js";
import { registerAuthRoutes } from "./routes/authRoutes.js";
import { CredentialsProvider } from "./CredentialsProvider.js";
import { UsersProvider } from "./UsersProvider.js";
import { registerClassRoutes } from "./routes/classesRoutes.js";
import { ClassesProvider } from "./ClassesProvider.js";

const PORT = Number.parseInt(getEnvVar("PORT", false), 10) || 3000;
const STATIC_DIR = getEnvVar("STATIC_DIR") || "public";

const app = express();

const mongoClient = await connectMongo();
const credentialsProvider = new CredentialsProvider(mongoClient);
const usersProvider = new UsersProvider(mongoClient)
const classesProvider = new ClassesProvider(mongoClient)

app.use(express.json({ limit: "100mb"}));
app.use(express.static(STATIC_DIR));
app.use(`/${getEnvVar("UPLOADS_FOLDER_DIR")}`, express.static(getEnvVar("UPLOADS_FOLDER_DIR")));


registerAuthRoutes(app, credentialsProvider, usersProvider);
registerClassRoutes(app, classesProvider)

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(STATIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}. CTRL+C to stop.`);
});