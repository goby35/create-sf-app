# 🚀 Hướng dẫn Nhanh - Lens Protocol V2

## Bước 1: Chuẩn bị

### 1.1. Cài đặt Dependencies
```bash
npm install
```

### 1.2. Tạo file .env
Copy file `.env.example` thành `.env`:
```bash
copy .env.example .env
```

Mở file `.env` và điền private key của bạn:
```env
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY_CUA_BAN_
```

⚠️ **QUAN TRỌNG**:
- Private key phải có prefix `0x`
- Độ dài: 66 ký tự (bao gồm `0x`)
- CHỈ dùng ví TEST, không dùng ví chính
- KHÔNG chia sẻ private key với ai

## Bước 2: Chạy Demo Authentication

Chạy file demo đăng nhập:
```bash
npm start
```

Hoặc:
```bash
npx ts-node src/index.ts
```

### Kết quả mong đợi:
```
==================================================
  LENS PROTOCOL V2 - BUILDER ENVIRONMENT
==================================================

Wallet Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Chain: Lens Chain Testnet (ID: 37111)
Environment: Testnet

[1/3] Authenticating with Builder account...
SUCCESS: Logged in successfully!

[2/3] Verifying session...
Session Status: ACTIVE

[3/3] Session client is ready!

You can now use the sessionClient to:
  - Create profiles
  - Publish posts
  - Follow/unfollow accounts
  - And more...

==================================================
  AUTHENTICATION COMPLETED SUCCESSFULLY
==================================================
```

## Bước 3: Hiểu cấu trúc code

### 📁 `src/client.ts`
Khởi tạo Lens Protocol client:
```typescript
import { PublicClient, testnet } from "@lens-protocol/client";

export const client = PublicClient.create({
  environment: testnet,
});
```

### 📁 `src/signer.ts`
Cấu hình ví và signer với Viem:
```typescript
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lensChainTestnet } from "./chains";

const account = privateKeyToAccount(privateKey);
const signer = createWalletClient({
  account,
  chain: lensChainTestnet,
  transport: http(),
});
```

### 📁 `src/chains.ts`
Định nghĩa Lens Chain Testnet:
```typescript
export const lensChainTestnet = {
  id: 37111,
  name: "Lens Chain Testnet",
  nativeCurrency: {
    name: "Grass",
    symbol: "GRASS",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lens.dev"],
    },
  },
} as const satisfies Chain;
```

### 📁 `src/index.ts`
Main entry point - Demo authentication flow:
1. Đăng nhập với builder account
2. Verify session
3. Sẵn sàng sử dụng sessionClient

## Bước 4: Development

### Kiểm tra TypeScript errors
```bash
npm run type-check
```

### Build project
```bash
npm run build
```

### Clean build
```bash
npm run clean
```

## Bước 5: Mở rộng tính năng

### Tạo Profile
Xem file: `src/examples/create-profile.ts`

### Query Profiles
Xem file: `src/examples/query-profiles.ts`

### Sử dụng Helper Functions
```typescript
import { formatAddress, isValidAddress } from "./utils/helpers";

const short = formatAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
// => "0x742d...bEb"
```

## 📚 Resources

- **Lens Docs**: https://docs.lens.xyz
- **Lens Testnet Explorer**: https://scan.testnet.lens.dev
- **Lens Discord**: https://discord.gg/lens
- **GraphQL API**: https://api.testnet.lens.xyz/graphql

## ❓ Troubleshooting

### Lỗi: "Cannot find module"
```bash
npm install
```

### Lỗi: "WALLET_PRIVATE_KEY is not defined"
- Kiểm tra file `.env` đã tồn tại
- Kiểm tra format: `WALLET_PRIVATE_KEY=0x...`

### Lỗi: "Invalid private key"
- Private key phải có 66 ký tự (bao gồm `0x`)
- Không có khoảng trắng
- Format: `0x` + 64 hex characters

### Lỗi kết nối RPC
- Kiểm tra internet
- RPC có thể bị rate limit, thử lại sau vài giây

## 🎯 Next Steps

1. ✅ Hoàn thành authentication
2. 🔄 Implement create profile
3. 🔄 Implement query profiles
4. 🔄 Implement create post
5. 🔄 Implement follow/unfollow

## 💡 Tips

- Đọc kỹ docs của Lens Protocol V2
- SDK version canary có thể thay đổi API
- Luôn test trên testnet trước
- Backup private key an toàn
- Sử dụng TypeScript để có type safety

## 🤝 Contributing

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo Pull Request.

---

**Happy Building on Lens! 🌿**
