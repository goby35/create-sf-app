import * as dotenv from "dotenv";
import { signMessageWith, handleOperationWith } from "@lens-protocol/client/viem";
import { app, type Platform } from "@lens-protocol/metadata";
import { uri, evmAddress } from "@lens-protocol/client";
import { createApp, fetchApp } from "@lens-protocol/client/actions";
import { uploadImageFromPath, uploadMetadataToStorage } from "./storage/upload";
import { client } from "./client";
import { signer, account } from "./signer";

dotenv.config();

const LOGO_PATH = "./src/assets/slice-logo.png";
const METADATA = {
  name: "Slice",
  tagline: "Social platform built on Lens Protocol",
  description: "Slice is a modern social application built on Lens Protocol V2",
  developer: "Tmh3101 <minhhieu31012004@gmail.com>",
  url: "https://sf-web-ten.vercel.app/",
  platforms: ["web"] as Platform[],
};

const uploadMetadata = async (metadata: any): Promise<string> => {
  const logoUri = await uploadImageFromPath(LOGO_PATH);

  const uri = await uploadMetadataToStorage(app({
    ...metadata,
    logo: logoUri,
  }));

  return uri;
};

async function createSliceApp() {
  const AdminAdress = process.env.TREASURY_ADDRESS;
  if (!AdminAdress) {
    throw new Error("Vui lòng điền TREASURY_ADDRESS vào file .env");
  }

  console.log("\n" + "=".repeat(70));
  console.log("  CREATE SLICE APP ON LENS PROTOCOL TESTNET");
  console.log("=".repeat(70) + "\n");

  console.log("📋 App Configuration:");
  console.log(`   Name: Slice`);
  console.log(`   Admin: ${AdminAdress}`);
  console.log(`   Treasury: ${AdminAdress}`);
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
    
    // Metadata uploaded to IPFS via Pinata
    console.log("📤 [2/4] Using IPFS metadata...");

    const metadataUri = await uploadMetadata(METADATA);
    console.log(`    Metadata URI: ${metadataUri}`);
    console.log(`    Verify at: https://gateway.pinata.cloud/ipfs/bafkreianr76by3y6at65we7dm4c7mg6pgfbk4m5ihpqvxgbs6fbhc34fnm\n`);

    // ========================================
    // STEP 3: PREPARE REQUEST
    // ========================================
    console.log("🔧 [3/4] Preparing CreateApp request...");
    
    const createAppRequest = {
      admins: [evmAddress(AdminAdress)],
      treasury: evmAddress(AdminAdress),
      metadataUri: uri(metadataUri), // the URI from the previous step
    };

    console.log("    Request prepared successfully!\n");

    // ========================================
    // STEP 4: CREATE APP
    // ========================================
    console.log("🚀 [4/4] Submitting CreateApp transaction...");
    console.log("    This may take a few moments...\n");

    const result = await createApp(sessionClient, {
      ...createAppRequest,
      defaultFeed: {
        globalFeed: true,
      },
      graph: {
        globalGraph: true,
      },
      namespace: {
        globalNamespace: true,
      },
    })
    .andThen(handleOperationWith(signer))
    .andThen(sessionClient.waitForTransaction)
    .andThen((txHash) => fetchApp(sessionClient, { txHash }));

    if (result.isErr()) {
      console.error("\n❌ Failed to create app:");
      console.error(result.error);
      process.exit(1);
    }

    const response: any = result.value;
    console.log("    ✅ CreateApp transaction processed!\n");
    console.log(`    App ID: ${response.appId}`);
    console.log("RESPONSE:", response);

    // ========================================
    // HANDLE RESPONSE
    // ========================================
    console.log("\n" + "=".repeat(70));
    console.log("\n\n=> RESPONSE:\n", response);
    console.log("\n\n" + "=".repeat(70) + "\n");

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

createSliceApp();
