import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "./client";
import { signer, account } from "./signer";

async function main() {
  console.log("\n" + "=".repeat(50));
  console.log("  LENS PROTOCOL V2 - BUILDER ENVIRONMENT");
  console.log("=".repeat(50) + "\n");
  
  console.log(`Wallet Address: ${account.address}`);
  console.log(`Chain: Lens Chain Testnet (ID: 37111)`);
  console.log(`Environment: Testnet\n`);

  try {
    // ========================================
    // STEP 1: AUTHENTICATION
    // ========================================
    console.log("[1/3] Authenticating with Builder account...");
    
    const authenticated = await client.login({
      builder: {
        address: account.address,
      },
      signMessage: signMessageWith(signer),
    });

    if (authenticated.isErr()) {
      console.error("\nAuthentication failed:", authenticated.error);
      process.exit(1);
    }

    const sessionClient = authenticated.value;
    console.log("SUCCESS: Logged in successfully!\n");

    // ========================================
    // STEP 2: VERIFY SESSION
    // ========================================
    console.log("[2/3] Verifying session...");
    const isAuthenticated = sessionClient.isSessionClient();
    console.log(`Session Status: ${isAuthenticated ? 'ACTIVE' : 'INACTIVE'}\n`);

    // ========================================
    // STEP 3: SESSION CLIENT READY
    // ========================================
    console.log("[3/3] Session client is ready!");
    console.log("\nYou can now use the sessionClient to:");
    console.log("  - Create profiles");
    console.log("  - Publish posts");
    console.log("  - Follow/unfollow accounts");
    console.log("  - And more...\n");

    console.log("=".repeat(50));
    console.log("  AUTHENTICATION COMPLETED SUCCESSFULLY");
    console.log("=".repeat(50) + "\n");

  } catch (error) {
    console.error("\nUnexpected error occurred:");
    console.error(error);
    process.exit(1);
  }
}

main();