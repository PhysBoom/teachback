import express from "express";
import { verifyAuthToken } from "../authUtils.js";
import {
  imageDataUrlMiddleware,
  handleImageFileErrors,
} from "../imageUpload.js";

export function registerClassRoutes(app, classesProvider) {
  const classesRouter = express.Router();

  // List sessions
  classesRouter.get("/", async (req, res) => {
    const { teacherId } = req.query;
    const sessions = await classesProvider.getSessions(teacherId);
    res.status(200).send(sessions);
  });

  // Create session
  classesRouter.post("/", verifyAuthToken, imageDataUrlMiddleware, async (req, res) => {
    try {
      const {
        topicCsv,
        title,
        description,
        startTime,
        durationMinutes,
        image,
        meetingLink,
      } = req.body ?? {};

      const teacherId = req.userInfo.username;

      if (!teacherId || !title || !startTime) {
        res.status(400).send({
          error: "Missing title or startTime",
        });
        return;
      }

      const session = await classesProvider.createSession({
        teacherId,
        topicCsv,
        title,
        description,
        startTime,
        durationMinutes,
        image, // now "/uploads/<filename>"
        meetingLink,
      });

      res.status(201).send(session);
    } catch (error) {
      res.status(400).send({
        error: error.message || "Failed to create session",
      });
    }
  });

  // Update session
  classesRouter.put("/:sessionId", verifyAuthToken, imageDataUrlMiddleware, async (req, res) => {
    try {
      const { sessionId } = req.params;
      const username = req.userInfo.username;

      const existing = await classesProvider.getSessionById(sessionId);

      if (!existing) {
        res.status(404).send({
          error: "Session not found",
        });
        return;
      }

      if (existing.teacher?.id !== username) {
        res.status(403).send({
          error: "You can only update your own sessions",
        });
        return;
      }

      const updated = await classesProvider.editSession(sessionId, req.body ?? {});
      res.status(200).send(updated);
    } catch (error) {
      res.status(400).send({
        error: error.message || "Failed to update session",
      });
    }
  });

  // Delete session
  classesRouter.delete("/:sessionId", verifyAuthToken, async (req, res) => {
    try {
      const { sessionId } = req.params;
      const username = req.userInfo.username;

      const existing = await classesProvider.getSessionById(sessionId);

      if (!existing) {
        res.status(404).send({
          error: "Session not found",
        });
        return;
      }

      if (existing.teacher?.id !== username) {
        res.status(403).send({
          error: "You can only delete your own sessions",
        });
        return;
      }

      const deleted = await classesProvider.deleteSession(sessionId);

      if (!deleted) {
        res.status(404).send({
          error: "Session not found",
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(400).send({
        error: error.message || "Failed to delete session",
      });
    }
  });

  app.use("/api/classes", classesRouter);
  app.use(handleImageFileErrors);
}