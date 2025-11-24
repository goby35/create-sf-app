import fs from "node:fs/promises";
import path from "node:path";
import { chains } from "@lens-chain/sdk/viem";
import { immutable } from "@lens-chain/storage-client";
import { storageClient } from "./client";

const acl = immutable(chains.testnet.id);

export async function uploadImageFromPath(filePath: string) {
  try {
    await fs.access(filePath);

    const fileBuffer = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName).toLowerCase();
    let mimeType = "image/png"; // Mặc định

    if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
    if (ext === ".gif") mimeType = "image/gif";
    if (ext === ".webp") mimeType = "image/webp";

    console.log(`🔄 Đang chuẩn bị upload: ${fileName} (${mimeType})...`);

    const fileToUpload = new File([fileBuffer], fileName, { type: mimeType });
    const result = await storageClient.uploadFile(fileToUpload, { acl });

    console.log("✅ Upload thành công!");
    console.log("🔗 IPFS URL:", result.uri);
    
    return result.uri;
  } catch (error) {
    console.error("❌ Lỗi khi upload file:", error);
    throw error;
  }
}

export const uploadMetadataToStorage = async (metadata: any): Promise<string> => {
  const { uri } = await storageClient.uploadAsJson(metadata);
  return uri;
};