import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lensChainTestnet, lensChainMainnet } from "./chains"; // Import chuỗi custom
import { IS_MAINNET } from "./constants";

import * as dotenv from "dotenv";

dotenv.config();

const privateKeyRaw = process.env.WALLET_PRIVATE_KEY;
if (!privateKeyRaw) {
  throw new Error("Vui lòng điền WALLET_PRIVATE_KEY vào file .env");
}

// Trim and remove surrounding quotes if present
const privateKeyTrimmed = privateKeyRaw.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");

// Ensure 0x prefix
const privateKey = privateKeyTrimmed.startsWith("0x") ? privateKeyTrimmed : `0x${privateKeyTrimmed}`;

// Validate format: 0x + 64 hex chars
if (!/^0x[a-fA-F0-9]{64}$/.test(privateKey)) {
  const hexOnly = privateKey.replace(/^0x/i, "");
  const length = hexOnly.length;
  throw new Error(
    `Invalid WALLET_PRIVATE_KEY format: expected 64 hex characters after '0x' (32 bytes). Got ${length} characters. Please check your .env and ensure the key is in the form 0x<64 hex chars>.`
  );
}

export const account = privateKeyToAccount(privateKey as `0x${string}`);

export const signer = createWalletClient({
  account,
  chain: IS_MAINNET ? lensChainMainnet : lensChainTestnet,
  transport: http(),
});