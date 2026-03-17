import { getEnvVar } from "./getEnvVar.js";

export class UsersProvider {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;

    const usersCollectionName = getEnvVar("USERS_COLLECTION_NAME");

    this.usersCollection = this.mongoClient
      .db()
      .collection(usersCollectionName);
  }

  // helper to normalize Mongo docs → frontend safe
  _serialize(doc) {
    return {
      ...doc,
      id: doc._id.toString(),
      _id: undefined,
    };
  }

  async getUserByUsername(username) {
    if (!username) return null;

    const user = await this.usersCollection.findOne({ username });

    if (!user) return null;

    return this._serialize(user);
  }
}