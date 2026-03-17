import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getEnvVar } from "./getEnvVar.js";

export class ImageFormatError extends Error {}

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
]);

const MIME_TO_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

function parseDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") {
    return null;
  }

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  const [, mimeType, base64Data] = match;

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new ImageFormatError("Unsupported image format");
  }

  return { mimeType, base64Data };
}

export async function saveImageDataUrl(dataUrl) {
  if (!dataUrl) {
    return null;
  }

  const parsed = parseDataUrl(dataUrl);

  if (!parsed) {
    throw new ImageFormatError("Image must be a valid data URL");
  }

  const { mimeType, base64Data } = parsed;
  const buffer = Buffer.from(base64Data, "base64");

  const maxBytes = 5 * 1024 * 1024;
  if (buffer.length > maxBytes) {
    throw new ImageFormatError("Image must be 5 MB or smaller");
  }

  const uploadsDir = getEnvVar("UPLOADS_FOLDER_DIR");
  await fs.mkdir(uploadsDir, { recursive: true });

  const extension = MIME_TO_EXT[mimeType] ?? "bin";
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

export async function imageDataUrlMiddleware(req, res, next) {
  try {
    const image = req.body?.image;

    if (!image) {
      return next();
    }

    const uploadedImageUrl = await saveImageDataUrl(image);
    req.body.image = uploadedImageUrl;

    next();
  } catch (error) {
    next(error);
  }
}

export function handleImageFileErrors(err, req, res, next) {
  if (err instanceof ImageFormatError) {
    res.status(400).send({
      error: "Bad Request",
      message: err.message,
    });
    return;
  }

  next(err);
}