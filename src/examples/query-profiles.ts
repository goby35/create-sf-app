/**
 * Example: Query profiles từ một địa chỉ ví
 * 
 * Demo cách sử dụng GraphQL query với Lens Protocol
 */

import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "../client";
import { signer, account } from "../signer";

async function queryProfiles(address: string) {
  console.log("\n=== QUERY PROFILES ===\n");
  console.log(`Địa chỉ: ${address}\n`);

  try {
    // 1. Đăng nhập
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

    // 2. Query profiles
    console.log("Đang tìm kiếm profiles...\n");

    // TODO: Implement GraphQL query khi rõ API
    // Ví dụ query structure:
    console.log("📝 Example GraphQL Query:");
    console.log(`
      query Accounts($request: AccountsRequest!) {
        accounts(request: $request) {
          items {
            address
            profiles {
              id
              handle {
                localName
                fullHandle
              }
              metadata {
                name
                bio
              }
            }
          }
        }
      }
    `);

    console.log("\n💡 Cần implement với typed GraphQL client");
    console.log("📚 Docs: https://docs.lens.xyz\n");

  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Example usage:
// queryProfiles("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");

export { queryProfiles };
