/**
 * Example: Create a new App on Lens Protocol
 * 
 * This example demonstrates how to create a new App using the CreateApp mutation.
 * You need to be authenticated with a Builder account that has permission to create apps.
 */

import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "../client";
import { signer, account } from "../signer";
// @ts-ignore - GraphQL mutations are exported from @lens-protocol/graphql
import { CreateAppMutation } from "@lens-protocol/graphql";

async function createApp() {
  console.log("\n" + "=".repeat(60));
  console.log("  CREATE APP ON LENS PROTOCOL");
  console.log("=".repeat(60) + "\n");

  try {
    // ========================================
    // STEP 1: AUTHENTICATE
    // ========================================
    console.log("[1/3] Authenticating...");
    
    const authenticated = await client.login({
      builder: {
        address: account.address,
      },
      signMessage: signMessageWith(signer),
    });

    if (authenticated.isErr()) {
      console.error("❌ Authentication failed:", authenticated.error);
      process.exit(1);
    }

    const sessionClient = authenticated.value;
    console.log("✅ Authenticated successfully!\n");

    // ========================================
    // STEP 2: PREPARE APP DATA
    // ========================================
    console.log("[2/3] Preparing app data...");
    
    const appData = {
      // Admin/Owner address - this address will own and control the app
      admins: [
        "0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6" // Your admin address
      ],
      
      // Metadata URI - JSON file containing app metadata
      // You'll need to upload this JSON to IPFS or a permanent storage
      metadataUri: "ipfs://bafkreih4r6qvb7wqvdfqvq7yxj5q6z3r2w4x5y6a7b8c9d0e1f2g3h4i5j6k", // Example, replace with actual
      
      // Optional: Treasury address where app fees/revenue will go
      // If not provided, defaults to the creator's address
      treasury: "0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6",
    };

    console.log("App Configuration:");
    console.log(`  Admins: ${appData.admins.join(", ")}`);
    console.log(`  Treasury: ${appData.treasury}`);
    console.log(`  Metadata URI: ${appData.metadataUri}\n`);

    // ========================================
    // STEP 3: CREATE APP
    // ========================================
    console.log("[3/3] Creating app on Lens Protocol...");
    console.log("This will require a blockchain transaction.\n");

    const result = await sessionClient.mutation(CreateAppMutation, {
      request: appData
    });

    if (result.isErr()) {
      console.error("❌ Failed to create app:", result.error);
      process.exit(1);
    }

    const response = result.value;
    console.log("\n✅ App creation transaction submitted!");
    console.log("Response:", JSON.stringify(response, null, 2));

    // Check response type
    if (response.__typename === "CreateAppResponse") {
      console.log("\n🎉 SUCCESS!");
      console.log(`Transaction Hash: ${response.hash}`);
      console.log(`\nView transaction on Lens Explorer:`);
      console.log(`https://scan.testnet.lens.dev/tx/${response.hash}`);
    } else if (response.__typename === "SelfFundedTransactionRequest") {
      console.log("\n💰 Transaction requires self-funding");
      console.log("You need to sign and broadcast this transaction:");
      console.log(JSON.stringify(response.raw, null, 2));
    } else if (response.__typename === "TransactionWillFail") {
      console.error("\n❌ Transaction will fail:");
      console.error(`Reason: ${response.reason}`);
    } else {
      console.log("\nUnexpected response type:", response.__typename);
    }

    console.log("\n" + "=".repeat(60));
    console.log("  APP CREATION PROCESS COMPLETED");
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("\n❌ Unexpected error:");
    console.error(error);
    process.exit(1);
  }
}

// ========================================
// METADATA JSON FORMAT
// ========================================
/**
 * The metadata URI should point to a JSON file with this structure:
 * 
 * {
 *   "name": "Slice",
 *   "tagline": "Your app's tagline",
 *   "description": "Detailed description of your app",
 *   "developer": "Your name or organization",
 *   "url": "https://sf-web-ten.vercel.app/",
 *   "logo": "ipfs://...", // Logo image URI
 *   "platforms": ["WEB", "IOS", "ANDROID"],
 *   "privacyPolicy": "https://sf-web-ten.vercel.app/privacy",
 *   "termsOfService": "https://sf-web-ten.vercel.app/terms"
 * }
 * 
 * Upload this JSON to IPFS and use the resulting hash as metadataUri
 */

// ========================================
// USAGE INSTRUCTIONS
// ========================================
/**
 * 1. Upload your app metadata JSON to IPFS
 *    - Use services like Pinata, NFT.Storage, or Web3.Storage
 *    - Get the IPFS hash (e.g., ipfs://bafkreih4r6qvb7...)
 * 
 * 2. Update the metadataUri in the appData object above
 * 
 * 3. Run this script:
 *    npx ts-node src/examples/create-app.ts
 * 
 * 4. Wait for transaction confirmation
 * 
 * 5. Your app will be created and you'll get the app address
 */

// Uncomment to run
// createApp();

export { createApp };
