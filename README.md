# Lens Protocol V2 - Builder Environment

Dự án TypeScript để xây dựng ứng dụng trên Lens Protocol V2 với Lens Chain Testnet.

## 📋 Yêu cầu

- Node.js >= 18
- TypeScript
- Một ví Ethereum với private key

## 🚀 Cài đặt

1. **Clone hoặc tải dự án**

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình môi trường**

Tạo file `.env` trong thư mục gốc:
```env
WALLET_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

⚠️ **LƯU Ý**: 
- Đừng commit file `.env` lên Git
- Sử dụng ví test, không dùng ví chính
- Private key phải bắt đầu bằng `0x`

## 📁 Cấu trúc dự án

```
lens-builder-env/
├── src/
│   ├── index.ts       # Main entry point - Demo authentication
│   ├── client.ts      # Lens Protocol client configuration
│   ├── signer.ts      # Wallet configuration với Viem
│   └── chains.ts      # Lens Chain Testnet configuration
├── package.json
├── tsconfig.json
├── .env              # Environment variables (tự tạo)
└── README.md
```

## 🎯 Chạy ứng dụng

### 1. Authentication Demo
```bash
npx ts-node src/index.ts
# Hoặc: npm start
```

### 2. Create Slice App
```bash
npx ts-node src/create-slice-app.ts
```

**Slice App Configuration:**
- **Tên**: Slice
- **Admin**: 0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6
- **Treasury**: 0x00399b4E7EdcF538cc4aD03c4FCfE366B65234a6
- **Website**: https://sf-web-ten.vercel.app/
- **Test App Reference**: 0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7

### Compile và chạy
```bash
npx tsc
node dist/index.js
```

## 📚 Các tính năng

### 1. Authentication (Đăng nhập)
File `src/index.ts` demo cách:
- Đăng nhập với Builder account (ví address)
- Xác thực session
- Kiểm tra trạng thái đăng nhập

### 2. Create App (Tạo ứng dụng Lens)
File `src/create-slice-app.ts`:
- Tạo app "Slice" trên Lens Protocol
- Cấu hình admin và treasury address
- Upload metadata và submit transaction
- Theo dõi transaction trên Lens Explorer

### 2. Lens Client Configuration
File `src/client.ts`:
- Cấu hình Lens Protocol client
- Sử dụng testnet environment
- Kết nối với Lens Chain Testnet

### 3. Wallet & Signer Setup
File `src/signer.ts`:
- Cấu hình ví với Viem
- Tạo wallet client
- Kết nối với Lens Chain Testnet

### 4. Chain Configuration
File `src/chains.ts`:
- Định nghĩa Lens Chain Testnet (Chain ID: 37111)
- Native currency: GRASS
- RPC và Block Explorer URLs

## 🔧 Thông tin Lens Chain Testnet

- **Chain ID**: 37111
- **Chain Name**: Lens Chain Testnet
- **Native Currency**: GRASS (18 decimals)
- **RPC URL**: https://rpc.testnet.lens.dev
- **Block Explorer**: https://scan.testnet.lens.dev
- **API GraphQL**: https://api.testnet.lens.xyz/graphql

## 📖 API Documentation

Lens Protocol V2 docs: https://docs.lens.xyz

## 🛠️ Development

### Cài thêm dependencies
```bash
npm install <package-name>
```

### Kiểm tra TypeScript errors
```bash
npx tsc --noEmit
```

### Format code (nếu có prettier)
```bash
npm install -D prettier
npx prettier --write "src/**/*.ts"
```

## 🎨 Mở rộng dự án

Sau khi authentication thành công, bạn có thể:

1. **Tạo Profile**
```typescript
const result = await sessionClient.createProfile({
  handle: "myhandle",
  // ... other options
});
```

2. **Đăng bài (Post)**
```typescript
const result = await sessionClient.createPost({
  content: "Hello Lens!",
  // ... other options
});
```

3. **Follow/Unfollow**
```typescript
const result = await sessionClient.follow({
  profileId: "0x01",
});
```

## ⚠️ Troubleshooting

### Lỗi "Cannot find module"
```bash
npm install
npx tsc
```

### Lỗi "Private key invalid"
- Kiểm tra file `.env`
- Private key phải bắt đầu bằng `0x`
- Độ dài: 66 ký tự (bao gồm `0x`)

### Lỗi kết nối RPC
- Kiểm tra kết nối internet
- Đảm bảo RPC URL đúng trong `src/chains.ts`

## 📝 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

- Lens Protocol Discord: https://discord.gg/lens
- Documentation: https://docs.lens.xyz
