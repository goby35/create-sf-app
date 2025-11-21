import { PublicClient, testnet } from "@lens-protocol/client";

// Provide an origin header so the Lens GraphQL API accepts requests from Node.
// Some Lens endpoints validate the Origin header; setting it to localhost
// works for local development and testnet usage.
export const client = PublicClient.create({
  environment: testnet,
  origin: "http://localhost",
});