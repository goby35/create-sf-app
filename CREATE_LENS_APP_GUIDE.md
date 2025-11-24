# Hướng dẫn đầy đủ: Từ cấu hình đến tạo một Lens App (dựa trên `src/create-slice-app.ts`)

Tài liệu này hợp nhất nội dung hướng dẫn và cấu hình để bạn có một quy trình đầy đủ: chuẩn bị môi trường, cấu hình `client` và `signer`, upload tài sản và metadata lên IPFS, submit transaction tạo app, và xử lý lỗi phổ biến.

**Tóm tắt ngắn**: Script `src/create-slice-app.ts` thực hiện bốn bước chính:
- Xác thực builder wallet (login với `client`).
- Upload logo và metadata lên Groove.
- Chuẩn bị payload `CreateApp` (admins, treasury, metadataUri).
- Submit giao dịch, chờ mined và lấy phản hồi app.

**1) Yêu cầu & chuẩn bị môi trường**
- Node.js + npm; cài dependencies:

```powershell
npm install
```

- File `.env` cần tối thiểu các biến sau:

```
WALLET_PRIVATE_KEY=0x<64-hex-chars>
TREASURY_ADDRESS=0xYourTreasuryAddress
```

- Đảm bảo file logo tồn tại ở `./src/assets/slice-logo.png` hoặc chỉnh `LOGO_PATH` trong script.

**2) Cấu hình `src/client.ts`**
- Mục đích: tạo instance `PublicClient` từ `@lens-protocol/client` để gọi API Lens.
- File hiện tại (`src/client.ts`) ví dụ:

```ts
import { PublicClient, testnet } from "@lens-protocol/client";

// Provide an origin header so the Lens GraphQL API accepts requests from Node.
export const client = PublicClient.create({
  environment: testnet, // or mainnet
  origin: "https://sf-web-ten.vercel.app",
});
```

- Gợi ý cấu hình:
  - Khi phát triển local, đặt `origin` thành `http://localhost:3000`.
  - Giữ `environment: testnet` cho testnet; đổi sang môi trường production nếu cần theo doc thư viện.

**3) Cấu hình `src/signer.ts`**
- Mục đích: tạo `signer` (viem wallet client) và `account` từ private key để ký message/transaction.
- Điểm quan trọng trong `src/signer.ts` hiện tại:
  - Yêu cầu `WALLET_PRIVATE_KEY` trong `.env` (được trim và validate).
  - Tự động thêm `0x` nếu thiếu; validate định dạng `0x` + 64 hex chars.
  - Sử dụng `lensChainTestnet` từ `src/chains.ts` và `http()` transport — đảm bảo chuỗi có RPC hợp lệ.

Ví dụ `.env` hoàn chỉnh hơn:

```
WALLET_PRIVATE_KEY=0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
TREASURY_ADDRESS=0xYourTreasuryAddress
```

**4) Upload logo & metadata**
- `src/storage/upload.ts` chứa helper `uploadImageFromPath` và `uploadMetadataToStorage`. Script `create-slice-app.ts`:
  - Gọi `uploadImageFromPath(LOGO_PATH)` để nhận `logoUri`.
  - Gọi `uploadMetadataToStorage(app({ ...METADATA, logo: logoUri }))` (helper `app()` của `@lens-protocol/metadata`) để nhận `metadataUri`.

Kiểm tra:
- Nếu upload thất bại, kiểm tra thông tin Groove, giới hạn rate hoặc lỗi kết nối mạng.

**5) Chuẩn bị và submit CreateApp**
- Tạo `createAppRequest`:

```ts
const createAppRequest = {
  admins: [evmAddress(AdminAdress)],
  treasury: evmAddress(AdminAdress),
  metadataUri: uri(metadataUri),
};
```

- Submit bằng cách gọi `createApp(sessionClient, { ...createAppRequest, defaultFeed: { globalFeed: true }, graph: { globalGraph: true }, namespace: { globalNamespace: true }})`.
- Quy trình của script tiếp nối bằng:
  - `.andThen(handleOperationWith(signer))` để ký và gửi transaction.
  - `.andThen(sessionClient.waitForTransaction)` để chờ transaction mined.
  - `.andThen((txHash) => fetchApp(sessionClient, { txHash }))` để lấy thông tin app được tạo.

**6) Cách chạy script**
- Chạy trực tiếp bằng `ts-node` (không cần build):

```powershell
npx ts-node src/create-slice-app.ts
```

- Hoặc build và chạy:

```powershell
npm run build
node dist/src/create-slice-app.js
```

Đảm bảo trước khi chạy:
- `npm install` đã chạy.
- `.env` có `WALLET_PRIVATE_KEY` và `TREASURY_ADDRESS`.
- Wallet có đủ balance trên testnet để trả gas.

**7) Ví dụ METADATA (như trong script)**
- `name`: "Slice"
- `tagline`: "Social platform built on Lens Protocol"
- `description`: ngắn gọn mô tả app
- `developer`: tác giả (email/contact)
- `url`: website app
- `platforms`: ["web"]

