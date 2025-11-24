import { PublicClient, testnet, mainnet } from "@lens-protocol/client";
import { IS_MAINNET } from "./constants";

// Provide an origin header so the Lens GraphQL API accepts requests from Node.
// Some Lens endpoints validate the Origin header; setting it to localhost
// works for local development and testnet usage.
export const client = PublicClient.create({
  environment: IS_MAINNET ? mainnet : testnet,
  origin: "https://sf-web-ten.vercel.app",
});