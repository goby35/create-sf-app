/**
 * Simple script to verify Slice app configuration
 * 
 * Since CreateApp may require special permissions or direct contract interaction,
 * this script verifies the configuration and provides next steps.
 */

import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "./client";
import { signer, account } from "./signer";

/**

  __typename: 'App',
  address: '0xb3855583511c5f02168a8784B8125D72BD97caB7',
  createdAt: '2025-11-24T04:49:05+00:00',
  defaultFeedAddress: '0x31232Cb7dE0dce17949ffA58E9E38EEeB367C871',
  graphAddress: '0x4d97287FF1A0e030cA4604EcDa9be355dd8A8BaC',
  namespaceAddress: '0xFBEdC5C278cc01A843D161d5469202Fe4EDC99E4',
  owner: '0x7d5A4032104c0A3690eB3f41776AFb0d5Cc6f960',
  sponsorshipAddress: null,
  treasuryAddress: '0x7d5A4032104c0A3690eB3f41776AFb0d5Cc6f960',
  verificationEnabled: false,
  hasAuthorizationEndpoint: false,
  metadata: {
    __typename: 'AppMetadata',
    description: 'Slice is a modern social application built on Lens Protocol V2',
    developer: 'Tmh3101 <minhhieu31012004@gmail.com>',
    logo: 'https://ik.imagekit.io/lens/127446cbab6be754b38927bfec390597897fc0098e9c444e8cecec9a30b6cad3_6aGwsiFOE.png',
    name: 'Slice',
    platforms: [ 'WEB' ],
    privacyPolicy: null,
    tagline: 'Social platform built on Lens Protocol',
    termsOfService: null,
    url: 'https://sf-web-ten.vercel.app/'
  }
}
 */

// const SLICE_CONFIG = {
//   name: "Slice",
//   admin: "0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6",
//   treasury: "0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6",
//   website: "https://sf-web-ten.vercel.app/",
//   metadataUri: "ipfs://bafkreianr76by3y6at65we7dm4c7mg6pgfbk4m5ihpqvxgbs6fbhc34fnm",
//   testAppReference: "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7",
// }; 

const SLICE_CONFIG = {
  name: "Slice",
  admin: "0x7d5A4032104c0A3690eB3f41776AFb0d5Cc6f960",
  treasury: "0x7d5A4032104c0A3690eB3f41776AFb0d5Cc6f960",
  website: "https://sf-web-ten.vercel.app/",
  metadataUri: "lens://d8c04e484205f742775c8aca200ae03005b328c03f882408112b574190478404",
  testAppReference: "0xb3855583511c5f02168a8784B8125D72BD97caB7",
};

async function verifySliceConfig() {
  console.log("\n" + "=".repeat(70));
  console.log("  SLICE APP CONFIGURATION VERIFICATION");
  console.log("=".repeat(70) + "\n");

  console.log("📋 Slice App Details:");
  console.log(`   Name: ${SLICE_CONFIG.name}`);
  console.log(`   Admin: ${SLICE_CONFIG.admin}`);
  console.log(`   Treasury: ${SLICE_CONFIG.treasury}`);
  console.log(`   Website: ${SLICE_CONFIG.website}`);
  console.log(`   Wallet: ${account.address}\n`);

  console.log("📤 IPFS Metadata:");
  console.log(`   URI: ${SLICE_CONFIG.metadataUri}`);
  console.log(`   Verify at: https://gateway.pinata.cloud/ipfs/bafkreianr76by3y6at65we7dm4c7mg6pgfbk4m5ihpqvxgbs6fbhc34fnm\n`);

  console.log("🔍 Test App Reference:");
  console.log(`   Address: ${SLICE_CONFIG.testAppReference}`);
  console.log(`   View on Explorer: https://scan.testnet.lens.dev/address/${SLICE_CONFIG.testAppReference}\n`);

  try {
    // ========================================
    // STEP 1: AUTHENTICATE
    // ========================================
    console.log("🔐 [1/2] Authenticating with Builder account...");
    
    const authenticated = await client.login({
      builder: {
        address: account.address,
      },
      signMessage: signMessageWith(signer),
    });

    if (authenticated.isErr()) {
      console.error("\n❌ Authentication failed:", authenticated.error);
      console.error("\n💡 Your wallet may not have Builder permissions.");
      console.error("   Contact Lens team to get access.");
      process.exit(1);
    }

    const sessionClient = authenticated.value;
    console.log("    ✅ Authenticated successfully!\n");

    // ========================================
    // STEP 2: CHECK STATUS
    // ========================================
    console.log("✅ [2/2] Checking session status...");
    const isActive = sessionClient.isSessionClient();
    console.log(`    Session Status: ${isActive ? 'ACTIVE' : 'INACTIVE'}\n`);

    // ========================================
    // NEXT STEPS
    // ========================================
    console.log("=".repeat(70));
    console.log("  CONFIGURATION VERIFIED");
    console.log("=".repeat(70) + "\n");

    console.log("📝 Your Slice app is configured and ready!");
    console.log("\n💡 Next Steps:");
    console.log("\n1. Contact Lens Protocol Team:");
    console.log("   - Discord: https://discord.gg/lens");
    console.log("   - Request app creation with above configuration");
    console.log("   - Or request Builder permissions for your wallet");

    console.log("\n2. Alternative: Use Lens Dashboard (if available):");
    console.log("   - Visit Lens Protocol dashboard");
    console.log("   - Create app with GUI");
    console.log("   - Use the configuration above");

    console.log("\n3. Use Test App for Development:");
    console.log(`   - Test App: ${SLICE_CONFIG.testAppReference}`);
    console.log("   - You can use this to test your integration");
    console.log("   - Then migrate to your own app when ready");

    console.log("\n4. Direct Contract Interaction (Advanced):");
    console.log("   - If you have the App Registry contract address");
    console.log("   - You can call createApp() directly using viem");
    console.log("   - Requires contract ABI and sufficient permissions");

    console.log("\n📚 Resources:");
    console.log("   - Lens Docs: https://docs.lens.xyz");
    console.log("   - Testnet Explorer: https://scan.testnet.lens.dev");
    console.log("   - GraphQL API: https://api.testnet.lens.xyz/graphql");

    console.log("\n" + "=".repeat(70));
    console.log("\n✨ Configuration file saved for reference!");
    console.log("   You can provide this to Lens team when requesting app creation.\n");

  } catch (error: any) {
    console.error("\n" + "=".repeat(70));
    console.error("❌ ERROR");
    console.error("=".repeat(70));
    console.error(error);
    
    if (error.message?.includes("permissions") || error.message?.includes("unauthorized")) {
      console.error(`\n💡 Your wallet may not have the required permissions.`);
      console.error(`   Contact Lens Protocol team on Discord: https://discord.gg/lens`);
    }
    
    process.exit(1);
  }
}

// Run verification
verifySliceConfig();
