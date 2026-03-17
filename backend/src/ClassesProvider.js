import { getEnvVar } from "./getEnvVar.js";
import { ObjectId } from "mongodb";

export class ClassesProvider {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;

    const usersCollectionName = getEnvVar("USERS_COLLECTION_NAME");
    const classesCollectionName = getEnvVar("CLASSES_COLLECTION_NAME");

    this.usersCollection = this.mongoClient.db().collection(usersCollectionName);
    this.sessionsCollection = this.mongoClient.db().collection(classesCollectionName);
  }

  // helper to normalize Mongo docs → frontend safe
  _serialize(doc) {
    return {
      ...doc,
      id: doc._id.toString(),
      _id: undefined,
    };
  }

  async getSessions(teacherId) {
    const query = teacherId ? { "teacher.id": teacherId } : {};

    const sessions = await this.sessionsCollection
      .find(query)
      .sort({ startTime: 1 })
      .toArray();

    return sessions.map((s) => this._serialize(s));
  }

  async getSessionById(sessionId) {
    if (!ObjectId.isValid(sessionId)) {
      return null;
    }

    const session = await this.sessionsCollection.findOne({
      _id: new ObjectId(sessionId),
    });

    return session ? this._serialize(session) : null;
  }

  async deleteSession(sessionId) {
    const result = await this.sessionsCollection.deleteOne({
      _id: new ObjectId(sessionId),
    });

    return result.deletedCount > 0;
  }

  async createSession({
    teacherId,
    topicCsv,
    title,
    description,
    startTime,
    durationMinutes,
    image,
    meetingLink,
  }) {
    const user = await this.usersCollection.findOne({ username: teacherId });

    if (!user) {
      throw new Error("User not found");
    }

    const teacher = {
      id: user.username,
      name: user.name,
      avatar: user.avatar ?? null,
    };

    const topics = String(topicCsv ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const startMs =
      typeof startTime === "number"
        ? startTime
        : startTime instanceof Date
        ? startTime.getTime()
        : new Date(startTime).getTime();

    const durationMinsNum = Number(durationMinutes) || 30;
    const endMs = startMs + durationMinsNum * 60 * 1000;

    const newSession = {
      topics,
      title: title ?? "",
      description: description ?? "",
      image: typeof image === "string" ? image : null,
      startTime: startMs,
      endTime: endMs,
      teacher,
      meetingLink: meetingLink ?? "https://meet.google.com/123-efgh-123",
    };

    const result = await this.sessionsCollection.insertOne(newSession);

    return this._serialize({
      ...newSession,
      _id: result.insertedId,
    });
  }

  async editSession(
    sessionId,
    {
      teacherId,
      topicCsv,
      title,
      description,
      startTime,
      durationMinutes,
      image,
      meetingLink,
    } = {}
  ) {
    const existing = await this.sessionsCollection.findOne({
      _id: new ObjectId(sessionId),
    });

    if (!existing) return null;

    let teacher = existing.teacher;

    if (teacherId != null) {
      const user = await this.usersCollection.findOne({
        username: teacherId,
      });

      if (!user) {
        throw new Error("User not found");
      }

      teacher = {
        id: user.username,
        name: user.name,
        avatar: user.avatar ?? null,
      };
    }

    const nextTopics =
      topicCsv != null
        ? String(topicCsv)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : existing.topics;

    const startMs =
      startTime != null
        ? typeof startTime === "number"
          ? startTime
          : startTime instanceof Date
          ? startTime.getTime()
          : new Date(startTime).getTime()
        : existing.startTime;

    const durationMins =
      durationMinutes != null
        ? Number(durationMinutes) || 30
        : Math.round((existing.endTime - existing.startTime) / 60000);

    const endMs = startMs + durationMins * 60 * 1000;

    const updated = {
      ...existing,
      teacher,
      topics: nextTopics,
      title: title != null ? String(title) : existing.title,
      description:
        description != null ? String(description) : existing.description,
      image: image !== undefined ? image : existing.image,
      startTime: startMs,
      endTime: endMs,
      meetingLink: meetingLink ?? existing.meetingLink,
    };

    await this.sessionsCollection.updateOne(
      { _id: new ObjectId(sessionId) },
      { $set: updated }
    );

    return this._serialize(updated);
  }
}