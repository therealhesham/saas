import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * إعداد عميل DigitalOcean Spaces (متوافق مع AWS S3 API)
 */
function getS3Client() {
  const endpoint = process.env.DO_SPACES_ENDPOINT || "https://fra1.digitaloceanspaces.com";
  const region = process.env.DO_SPACES_REGION || "fra1";
  const accessKeyId = process.env.DO_SPACES_KEY;
  const secretAccessKey = process.env.DO_SPACES_SECRET;

  if (!accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: false,
  });
}

/**
 * رفع ملف إلى DigitalOcean Spaces مع آلية fallback محليّة للتطوير
 */
export async function uploadToSpaces(
  file: File | Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const bucket = process.env.DO_SPACES_BUCKET;
  const s3Client = getS3Client();

  const bytes = Buffer.isBuffer(file) ? file : Buffer.from(await (file as File).arrayBuffer());
  const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  // إذا كانت بيانات DigitalOcean متوفرة في .env يتم الرفع للسحابة
  if (s3Client && bucket) {
    try {
      const key = `projects/${cleanFilename}`;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: bytes,
        ContentType: contentType,
        ACL: "public-read",
      });

      await s3Client.send(command);

      const cdnUrl = process.env.DO_SPACES_CDN_URL;
      if (cdnUrl) {
        return `${cdnUrl.replace(/\/$/, "")}/${key}`;
      }

      const endpoint = (process.env.DO_SPACES_ENDPOINT || "https://fra1.digitaloceanspaces.com")
        .replace(/^https?:\/\//, "");
      return `https://${bucket}.${endpoint}/${key}`;
    } catch (error) {
      console.error("[DigitalOcean Spaces Upload Error]:", error);
      console.warn("جاري استخدام التخزين المحلي كبديل طوارئ...");
    }
  } else {
    console.info(
      "[DigitalOcean Spaces] مفاتيح DO_SPACES غير متوفرة في .env — تم حفظ الصورة محلياً في /public/uploads/projects"
    );
  }

  // Fallback للتطوير المحلي
  const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, cleanFilename);
  await fs.writeFile(filePath, bytes);

  return `/uploads/projects/${cleanFilename}`;
}
