/**
 * Create Slice App on Lens Protocol
 * 
 * This script creates the "Slice" app with the specified configuration.
 * 
 * App Details:
 * - Name: Slice
 * - Admin/Treasury: 0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6
 * - Website: https://sf-web-ten.vercel.app/
 */

import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "../client";
import { signer, account } from "../signer";
// @ts-ignore - GraphQL mutations
import { CreateAppMutation } from "@lens-protocol/graphql";

// App metadata structure
const APP_METADATA = {
  name: "Slice",
  tagline: "Social platform built on Lens Protocol",
  description: "Slice is a modern social application built on Lens Protocol V2",
  developer: "Slice Team",
  url: "https://sf-web-ten.vercel.app/",
  platforms: ["WEB"],
  // Add these if you have them:
  // logo: "ipfs://...",
  // privacyPolicy: "https://sf-web-ten.vercel.app/privacy",
  // termsOfService: "https://sf-web-ten.vercel.app/terms"
};

async function createSliceApp() {
  console.log("\n" + "=".repeat(70));
  console.log("  CREATE SLICE APP ON LENS PROTOCOL TESTNET");
  console.log("=".repeat(70) + "\n");

  console.log("📋 App Configuration:");
  console.log(`   Name: Slice`);
  console.log(`   Admin: 0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6`);
  console.log(`   Treasury: 0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6`);
  console.log(`   Website: https://sf-web-ten.vercel.app/`);
  console.log(`   Wallet: ${account.address}\n`);

  try {
    // ========================================
    // STEP 1: AUTHENTICATE
    // ========================================
    console.log("🔐 [1/4] Authenticating with Builder account...");
    
    const authenticated = await client.login({
      builder: {
        address: account.address,
      },
      signMessage: signMessageWith(signer),
    });

    if (authenticated.isErr()) {
      console.error("\n❌ Authentication failed:", authenticated.error);
      process.exit(1);
    }

    const sessionClient = authenticated.value;
    console.log("    ✅ Authenticated successfully!\n");

    // ========================================
    // STEP 2: UPLOAD METADATA TO IPFS
    // ========================================
    console.log("📤 [2/4] Preparing app metadata...");
    console.log("    Metadata:", JSON.stringify(APP_METADATA, null, 2));
    
    // For now, we'll use a placeholder. In production, you should:
    // 1. Upload APP_METADATA to IPFS using Pinata, NFT.Storage, etc.
    // 2. Get the IPFS hash
    // 3. Use it as metadataUri
    
    const metadataUri = "data:application/json," + encodeURIComponent(JSON.stringify(APP_METADATA));
    console.log(`    Metadata URI: ${metadataUri.substring(0, 100)}...\n`);

    // ========================================
    // STEP 3: PREPARE REQUEST
    // ========================================
    console.log("🔧 [3/4] Preparing CreateApp request...");
    
    const createAppRequest = {
      admins: ["0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6"],
      metadataUri: metadataUri,
      treasury: "0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6",
    };

    console.log("    Request prepared successfully!\n");

    // ========================================
    // STEP 4: CREATE APP
    // ========================================
    console.log("🚀 [4/4] Submitting CreateApp transaction...");
    console.log("    This may take a few moments...\n");

    const result = await sessionClient.mutation(CreateAppMutation, {
      request: createAppRequest
    });

    if (result.isErr()) {
      console.error("\n❌ Failed to create app:");
      console.error(result.error);
      process.exit(1);
    }

    const response = result.value;

    // ========================================
    // HANDLE RESPONSE
    // ========================================
    console.log("\n" + "=".repeat(70));
    
    if (response.__typename === "CreateAppResponse") {
      console.log("🎉 SUCCESS! App created!");
      console.log("=".repeat(70));
      console.log(`\n📝 Transaction Hash: ${response.hash}`);
      console.log(`\n🔍 View on Lens Explorer:`);
      console.log(`   https://scan.testnet.lens.dev/tx/${response.hash}`);
      console.log(`\n⏳ Waiting for transaction to be indexed...`);
      console.log(`   This may take 30-60 seconds.`);
      console.log(`\n✨ Once indexed, your app will be available on Lens Protocol!`);
      
    } else if (response.__typename === "SelfFundedTransactionRequest") {
      console.log("💰 SELF-FUNDED TRANSACTION REQUIRED");
      console.log("=".repeat(70));
      console.log(`\n⚠️  You need to sign and broadcast this transaction manually.`);
      console.log(`\nTransaction Data:`);
      console.log(JSON.stringify(response.raw, null, 2));
      console.log(`\n📖 Reason: ${response.reason}`);
      console.log(`   Self-funded reason: ${response.selfFundedReason}`);
      
    } else if (response.__typename === "TransactionWillFail") {
      console.log("❌ TRANSACTION WILL FAIL");
      console.log("=".repeat(70));
      console.error(`\nReason: ${response.reason}`);
      console.error(`\n💡 Possible causes:`);
      console.error(`   - Insufficient permissions`);
      console.error(`   - Invalid metadata URI`);
      console.error(`   - Network issues`);
      console.error(`\n📚 Check the Lens docs for CreateApp requirements.`);
      
    } else {
      console.log("⚠️  UNEXPECTED RESPONSE");
      console.log("=".repeat(70));
      console.log(`\nResponse type: ${response.__typename}`);
      console.log(`Full response:`, JSON.stringify(response, null, 2));
    }

    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error: any) {
    console.error("\n" + "=".repeat(70));
    console.error("❌ UNEXPECTED ERROR");
    console.error("=".repeat(70));
    console.error(error);
    
    if (error.message?.includes("permissions") || error.message?.includes("unauthorized")) {
      console.error(`\n💡 This wallet may not have permission to create apps.`);
      console.error(`   Contact Lens team or use an authorized wallet.`);
    }
    
    process.exit(1);
  }
}

// ========================================
// NOTES FOR PRODUCTION
// ========================================
/**
 * IMPORTANT: For production deployment, you should:
 * 
 * 1. Upload metadata to IPFS properly:
 *    - Use Pinata (https://pinata.cloud)
 *    - Or NFT.Storage (https://nft.storage)
 *    - Or Web3.Storage (https://web3.storage)
 * 
 * 2. Get a proper IPFS hash like:
 *    ipfs://bafkreih4r6qvb7wqvdfqvq7yxj5q6z3r2w4x5y6a7b8c9d0e1f2g3h4i5j6k
 * 
 * 3. Ensure your wallet has permission to create apps on testnet
 * 
 * 4. Have enough GRASS tokens for transaction fees
 * 
 * 5. Verify the transaction on Lens Explorer after creation
 */

// Run the script
createSliceApp();
