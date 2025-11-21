# Hướng dẫn Upload Metadata lên IPFS

Để create app trên Lens Protocol, bạn cần upload metadata lên IPFS và lấy URI.

## Option 1: Pinata (Khuyến nghị)

### 1. Tạo tài khoản Pinata
- Truy cập: https://pinata.cloud
- Đăng ký miễn phí (1GB storage)

### 2. Upload metadata JSON

Tạo file `slice-metadata.json`:
```json
{
  "name": "Slice",
  "tagline": "Social platform built on Lens Protocol",
  "description": "Slice is a modern social application built on Lens Protocol V2",
  "developer": "Slice Team",
  "url": "https://sf-web-ten.vercel.app/",
  "platforms": ["WEB"],
  "logo": "ipfs://YOUR_LOGO_IPFS_HASH",
  "privacyPolicy": "https://sf-web-ten.vercel.app/privacy",
  "termsOfService": "https://sf-web-ten.vercel.app/terms"
}
```

### 3. Upload qua Web Interface
1. Vào Pinata Dashboard
2. Click "Upload" → "File"
3. Chọn file `slice-metadata.json`
4. Lấy IPFS hash (bắt đầu bằng `Qm...` hoặc `bafy...`)
5. URI cuối cùng: `ipfs://YOUR_HASH`

### 4. Upload qua API (Tự động)

Cài đặt Pinata SDK:
```bash
npm install pinata-web3
```

Tạo file `upload-metadata.ts`:
```typescript
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
```

Thêm vào `.env`:
```
PINATA_JWT=your_pinata_jwt_token
```

Chạy:
```bash
npx ts-node upload-metadata.ts
```

## Option 2: NFT.Storage

### 1. Tạo tài khoản
- Truy cập: https://nft.storage
- Đăng ký miễn phí (storage không giới hạn)

### 2. Lấy API Key
- Vào Dashboard
- Tạo API Key

### 3. Upload qua API

Cài đặt:
```bash
npm install nft.storage
```

Code:
```typescript
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });

const metadata = {
  name: "Slice",
  // ... other fields
};

async function uploadToNFTStorage() {
  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const cid = await client.storeBlob(blob);
  console.log("IPFS URI:", `ipfs://${cid}`);
}

uploadToNFTStorage();
```

## Option 3: Web3.Storage

### 1. Tạo tài khoản
- Truy cập: https://web3.storage
- Đăng ký miễn phí

### 2. Upload qua Web3.Storage

Cài đặt:
```bash
npm install web3.storage
```

Code:
```typescript
import { Web3Storage, File } from 'web3.storage';

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

async function uploadToWeb3Storage() {
  const metadata = JSON.stringify({
    name: "Slice",
    // ... other fields
  });
  
  const file = new File([metadata], 'metadata.json', { type: 'application/json' });
  const cid = await client.put([file]);
  console.log("IPFS URI:", `ipfs://${cid}/metadata.json`);
}

uploadToWeb3Storage();
```

## Option 4: Local IPFS Node (Advanced)

### 1. Cài đặt IPFS Desktop
- Download: https://docs.ipfs.tech/install/ipfs-desktop/
- Hoặc CLI: https://docs.ipfs.tech/install/command-line/

### 2. Upload file
```bash
ipfs add slice-metadata.json
```

Output:
```
added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX slice-metadata.json
```

URI: `ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

## Sử dụng URI trong code

Sau khi có IPFS URI, cập nhật file `src/create-slice-app.ts`:

```typescript
// Thay đổi từ:
const metadataUri = "data:application/json," + encodeURIComponent(JSON.stringify(APP_METADATA));

// Thành:
const metadataUri = "ipfs://YOUR_IPFS_HASH_HERE";
```

## Verify Metadata

Kiểm tra metadata đã upload:
- Gateway public: https://ipfs.io/ipfs/YOUR_HASH
- Pinata gateway: https://gateway.pinata.cloud/ipfs/YOUR_HASH
- Cloudflare gateway: https://cloudflare-ipfs.com/ipfs/YOUR_HASH

## Best Practices

1. **Pin metadata**: Đảm bảo file được pin để không bị xóa
2. **Backup hash**: Lưu lại IPFS hash để reference sau
3. **Test URI**: Verify metadata có thể truy cập được qua gateway
4. **Logo**: Upload logo riêng lên IPFS và thêm vào metadata
5. **Privacy & Terms**: Thêm links đến privacy policy và terms of service

## Troubleshooting

### Không access được qua gateway
- Thử nhiều gateway khác nhau
- Đợi vài phút để IPFS propagate
- Verify hash chính xác

### Pin thất bại
- Check quota của service (Pinata: 1GB free)
- Verify API key còn hiệu lực
- Try lại sau vài phút

## Tài liệu tham khảo

- Pinata Docs: https://docs.pinata.cloud
- NFT.Storage Docs: https://nft.storage/docs
- Web3.Storage Docs: https://web3.storage/docs
- IPFS Docs: https://docs.ipfs.tech
