import { getEnvVar } from "./getEnvVar.js";
import bcrypt from "bcrypt";


function getDeterministicAvatar(username) {
  const avatars = [
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=alpha",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=beta",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=gamma",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=delta",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=epsilon",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=zeta",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=theta",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=omega",
  ];

  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  return avatars[Math.abs(hash) % avatars.length];
}

export class CredentialsProvider {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    const collectionName = getEnvVar("CREDS_COLLECTION_NAME");
    const usersCollectionName = getEnvVar("USERS_COLLECTION_NAME");

    this.collection = this.mongoClient.db().collection(collectionName);
    this.usersCollection = this.mongoClient.db().collection(usersCollectionName);
  }

  async registerUser(name, username, email, password, avatar) {
    const existingUser = await this.usersCollection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const finalAvatar = avatar || getDeterministicAvatar(username);

    const user = {
      username,
      email,
      name,
      avatar: finalAvatar,
    }

    await this.collection.insertOne({
      username,
      password: hashed,
    });

    await this.usersCollection.insertOne(user);

    return user;
  }

  async verifyPassword(username, password) {
    const credentials = await this.collection.findOne({ username });

    if (!credentials) {
      return false;
    }

    return await bcrypt.compare(password, credentials.password);
  }
}