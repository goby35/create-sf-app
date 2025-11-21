import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud"
});

const metadata = {
  name: "Slice",
  tagline: "Social platform built on Lens Protocol",
  description: "Slice is a modern social application built on Lens Protocol V2",
  developer: "Slice Team",
  url: "https://sf-web-ten.vercel.app/",
  platforms: ["WEB"]
};

async function uploadMetadata() {
  const upload = await pinata.upload.json(metadata);
  console.log("IPFS Hash:", upload.IpfsHash);
  console.log("URI:", `ipfs://${upload.IpfsHash}`);
}

uploadMetadata();