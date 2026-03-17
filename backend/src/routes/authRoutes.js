import express from "express";
import { generateAuthToken } from "../authUtils.js";
import { verifyAuthToken } from "../authUtils.js";

export function registerAuthRoutes(app, credentialsProvider, usersProvider) {
  const usersRouter = express.Router();
  const sessionsRouter = express.Router();

  // Register user
  usersRouter.post("/", async (req, res) => {
    const { username, email, password, name } = req.body ?? {};

    if (!username || !email || !password || !name) {
      res.status(400).send({
        error: "Missing username, email, password, or name",
      });
      return;
    }

    const result = await credentialsProvider.registerUser(
      name,
      username,
      email,
      password
    );

    if (!result) {
      res.status(409).send({
        error: "Username or email already taken",
      });
      return;
    }

    const token = await generateAuthToken(username);

    res.status(201).send({ token })
  });

  // Login / create session
  sessionsRouter.post("/", async (req, res) => {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      res.status(400).send({
        error: "Missing username or password",
      });
      return;
    }

    const isValid = await credentialsProvider.verifyPassword(
      username,
      password
    );

    if (!isValid) {
      res.status(401).send({
        error: "Invalid username or password",
      });
      return;
    }

    const token = await generateAuthToken(username);

    res.status(200).send({ token });
  });

  usersRouter.get("/me", verifyAuthToken, async (req, res) => {
    try {
      const username = req.userInfo?.username;

      if (!username) {
        res.status(401).send({ error: "Invalid token payload" });
        return;
      }

      const user = await usersProvider.getUserByUsername(username);

      if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal server error" });
    }
  });

  app.use("/api/users", usersRouter);
  app.use("/api/sessions", sessionsRouter);
}