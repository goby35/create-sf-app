import { chains } from "@lens-chain/sdk/viem";
import { immutable, StorageClient } from "@lens-chain/storage-client";
import fs from "node:fs/promises"; // Dùng promises để đọc file bất đồng bộ
import path from "node:path";
import { fileURLToPath } from "node:url";

// 1. Khởi tạo Client
const storageClient = StorageClient.create();

// 2. Định nghĩa cấu hình ACL (Access Control List)
const acl = immutable(chains.testnet.id);

/**
 * Hàm upload file từ đường dẫn cục bộ (Local Path)
 * @param filePath Đường dẫn tuyệt đối hoặc tương đối đến file ảnh
 */
async function uploadImageFromPath(filePath: string) {
  try {
    // Kiểm tra file có tồn tại không
    await fs.access(filePath);

    // Đọc file từ ổ đĩa vào Buffer
    const fileBuffer = await fs.readFile(filePath);
    
    // Lấy tên file từ đường dẫn
    const fileName = path.basename(filePath);

    // Xác định MIME type đơn giản dựa trên đuôi file (hoặc bạn có thể cài thư viện 'mime-types')
    const ext = path.extname(fileName).toLowerCase();
    let mimeType = "image/png"; // Mặc định
    if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
    if (ext === ".gif") mimeType = "image/gif";
    if (ext === ".webp") mimeType = "image/webp";

    console.log(`🔄 Đang chuẩn bị upload: ${fileName} (${mimeType})...`);

    // CHUYỂN ĐỔI: Tạo đối tượng File từ Buffer
    // Lưu ý: Node.js v20+ hỗ trợ class File toàn cục.
    // Nếu dùng Node thấp hơn, bạn cần polyfill hoặc dùng thư viện 'undici'
    const fileToUpload = new File([fileBuffer], fileName, { type: mimeType });

    // Gọi SDK để upload
    const result = await storageClient.uploadFile(fileToUpload, { acl });

    console.log("✅ Upload thành công!");
    console.log("🔗 IPFS URL:", result.uri);
    
    return result.uri;
    
  } catch (error) {
    console.error("❌ Lỗi khi upload file:", error);
    throw error;
  }
}

// --- CHẠY THỬ (Main execution) ---

// Lấy đường dẫn file từ tham số dòng lệnh hoặc hardcode
// Ví dụ chạy: ts-node upload-image.ts ./my-photo.png
const imagePath = process.argv[2] || "./example-image.png"; 

// Thực thi hàm
(async () => {
    if (!imagePath) {
        console.error("Vui lòng cung cấp đường dẫn file ảnh.");
        return;
    }
    
    // Tạo file giả để test nếu chưa có (Chỉ dùng cho demo, bạn có thể xóa đoạn này)
    if (!require('fs').existsSync(imagePath) && imagePath === "./example-image.png") {
        console.log("⚠️ Không tìm thấy file ảnh, đang tạo file dummy để test...");
        require('fs').writeFileSync(imagePath, "dummy image content");
    }

    await uploadImageFromPath(imagePath);
})();