/**
 * Example: Tạo Profile mới trên Lens Protocol
 * 
 * Chú ý: Cần authenticated session client
 */

import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "../client";
import { signer, account } from "../signer";

async function createProfile() {
  console.log("\n=== TẠO PROFILE MỚI ===\n");

  try {
    // 1. Đăng nhập
    console.log("Đang đăng nhập...");
    const authenticated = await client.login({
      builder: {
        address: account.address,
      },
      signMessage: signMessageWith(signer),
    });

    if (authenticated.isErr()) {
      console.error("Lỗi đăng nhập:", authenticated.error);
      return;
    }

    const sessionClient = authenticated.value;
    console.log("✅ Đăng nhập thành công!\n");

    // 2. Tạo profile mới
    console.log("Đang tạo profile...");
    
    // TODO: Thêm code tạo profile khi SDK có API
    // const result = await sessionClient.createProfile({
    //   handle: "myhandle",
    //   metadata: {
    //     name: "My Name",
    //     bio: "My bio",
    //   }
    // });

    console.log("\n💡 Lưu ý: API tạo profile có thể khác nhau tùy phiên bản SDK");
    console.log("📚 Tham khảo docs: https://docs.lens.xyz\n");

  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Uncomment để chạy
// createProfile();

export { createProfile };
