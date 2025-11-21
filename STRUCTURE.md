# 📁 Project Structure

```
lens-builder-env/
│
├── 📄 package.json              # Dependencies và scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 .env                      # Environment variables (GIT IGNORED)
├── 📄 .env.example              # Environment variables template
├── 📄 .gitignore               # Git ignore rules
│
├── 📖 README.md                 # Main documentation (English)
├── 📖 QUICKSTART.md             # Quick start guide (Vietnamese)
├── 📖 STRUCTURE.md              # This file - Project structure
│
└── src/                         # Source code
    │
    ├── 📄 index.ts              # Main entry point - Demo authentication
    ├── 📄 client.ts             # Lens Protocol client setup
    ├── 📄 signer.ts             # Wallet & signer configuration
    ├── 📄 chains.ts             # Lens Chain Testnet definition
    │
    ├── 📁 examples/             # Example implementations
    │   ├── create-profile.ts    # Example: Create a new profile
    │   └── query-profiles.ts    # Example: Query profiles by address
    │
    ├── 📁 utils/                # Utility functions
    │   └── helpers.ts           # Helper functions (format, validate, etc.)
    │
    ├── 📁 types/                # TypeScript type definitions
    │   └── index.ts             # Custom types for Lens Protocol
    │
    └── 📁 constants/            # Application constants
        └── index.ts             # Constants (config, validation, messages)
```

## 📝 File Descriptions

### Root Level Files

#### `package.json`
- Project metadata
- Dependencies management
- NPM scripts for development
- Available scripts:
  - `npm start` - Run main demo
  - `npm run build` - Compile TypeScript
  - `npm run type-check` - Check TypeScript errors
  - `npm run example:create-profile` - Run create profile example
  - `npm run example:query-profiles` - Run query profiles example

#### `tsconfig.json`
- TypeScript compiler configuration
- Target: ES2020
- Module: CommonJS
- Strict type checking enabled
- Output directory: `dist/`

#### `.env` (Git Ignored)
```env
WALLET_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```
⚠️ Never commit this file!

#### `.env.example`
Template for `.env` file with instructions

#### `.gitignore`
Prevents committing:
- `node_modules/`
- `.env`
- Build output (`dist/`)
- IDE files
- Log files

---

### Core Source Files (`src/`)

#### `index.ts` - Main Entry Point
**Purpose**: Demo authentication flow

**Key Features**:
- Login with builder account
- Session verification
- Status display

**Usage**:
```bash
npm start
```

---

#### `client.ts` - Lens Client Setup
**Purpose**: Initialize Lens Protocol client

**Key Code**:
```typescript
import { PublicClient, testnet } from "@lens-protocol/client";

export const client = PublicClient.create({
  environment: testnet,
});
```

**Exports**:
- `client` - Lens Protocol PublicClient instance

---

#### `signer.ts` - Wallet Configuration
**Purpose**: Setup wallet and signer with Viem

**Key Code**:
```typescript
const account = privateKeyToAccount(privateKey);
const signer = createWalletClient({
  account,
  chain: lensChainTestnet,
  transport: http(),
});
```

**Exports**:
- `account` - Viem account instance
- `signer` - Viem wallet client

**Dependencies**:
- Private key from `.env`
- Lens Chain Testnet configuration

---

#### `chains.ts` - Chain Definition
**Purpose**: Define Lens Chain Testnet configuration

**Configuration**:
- Chain ID: 37111
- Name: Lens Chain Testnet
- Native Currency: GRASS (18 decimals)
- RPC URL: https://rpc.testnet.lens.dev
- Block Explorer: https://scan.testnet.lens.dev

**Exports**:
- `lensChainTestnet` - Viem chain configuration
- `LENS_TESTNET_RPC` - RPC URL constant

---

### Examples (`src/examples/`)

#### `create-profile.ts`
**Purpose**: Example implementation for creating a new Lens profile

**Status**: Template (API implementation pending)

**Usage**:
```bash
npm run example:create-profile
```

---

#### `query-profiles.ts`
**Purpose**: Example GraphQL query for fetching profiles

**Status**: Template with GraphQL query structure

**Usage**:
```bash
npm run example:query-profiles
```

---

### Utilities (`src/utils/`)

#### `helpers.ts`
**Purpose**: Common utility functions

**Functions**:
- `formatAddress(address, length)` - Shorten Ethereum address
- `isValidAddress(address)` - Validate Ethereum address
- `formatDate(timestamp)` - Format Unix timestamp
- `sleep(ms)` - Sleep helper
- `retry(fn, maxRetries, delay)` - Retry async operations
- `parseHandle(handle)` - Remove @ from handle
- `formatHandle(handle)` - Add @ to handle
- `isValidHandle(handle)` - Validate Lens handle
- `truncate(text, maxLength)` - Truncate text with ellipsis
- `formatNumber(num)` - Format number with commas
- `weiToGrass(wei)` - Convert wei to GRASS token

**Example Usage**:
```typescript
import { formatAddress } from "./utils/helpers";

const short = formatAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
// => "0x742d...bEb"
```

---

### Types (`src/types/`)

#### `index.ts`
**Purpose**: TypeScript type definitions

**Types**:
- `LensProfile` - Profile structure
- `LensAccount` - Account with profiles
- `BuilderCredentials` - Login credentials
- `AuthResult` - Authentication result
- `EnvironmentConfig` - Environment configuration
- `TransactionStatus` - Transaction status enum
- `QueryResult<T>` - Query result wrapper
- `PaginationInfo` - Pagination metadata
- `PaginatedResult<T>` - Paginated data

**Example Usage**:
```typescript
import { LensProfile } from "./types";

const profile: LensProfile = {
  id: "0x01",
  handle: {
    localName: "myhandle",
    fullHandle: "myhandle.lens"
  },
  owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
};
```

---

### Constants (`src/constants/`)

#### `index.ts`
**Purpose**: Application-wide constants

**Constants**:
- `LENS_CHAIN_TESTNET` - Testnet configuration
- `LENS_CHAIN_MAINNET` - Mainnet info (TBD)
- `APP_CONFIG` - App configuration
- `VALIDATION` - Validation rules
- `ERROR_MESSAGES` - Error message constants
- `SUCCESS_MESSAGES` - Success message constants
- `API_ENDPOINTS` - API endpoints
- `STORAGE_KEYS` - Storage keys

**Example Usage**:
```typescript
import { LENS_CHAIN_TESTNET, VALIDATION } from "./constants";

console.log(LENS_CHAIN_TESTNET.CHAIN_ID); // 37111

if (!VALIDATION.HANDLE.PATTERN.test(handle)) {
  throw new Error("Invalid handle");
}
```

---

## 🔄 Data Flow

```
1. User runs: npm start
   ↓
2. index.ts loads
   ↓
3. Import dependencies:
   - client.ts (Lens client)
   - signer.ts (Wallet setup)
   - chains.ts (Chain config)
   ↓
4. Execute main():
   a. Display wallet info
   b. Call client.login() with builder credentials
   c. Verify session
   d. Display success message
```

## 🎯 Key Integration Points

### Authentication Flow
```
signer.ts → client.ts → index.ts
   ↓          ↓           ↓
 Wallet → Lens Client → Login
```

### Chain Configuration
```
chains.ts → signer.ts
    ↓
  Viem WalletClient with Lens Chain
```

### Type Safety
```
types/index.ts → All TypeScript files
       ↓
  Type checking and IntelliSense
```

---

## 📦 Build Output

After running `npm run build`, compiled JavaScript files appear in `dist/`:

```
dist/
├── index.js
├── client.js
├── signer.js
├── chains.js
├── examples/
├── utils/
├── types/
└── constants/
```

Run compiled code:
```bash
node dist/index.js
```

---

## 🚀 Development Workflow

1. **Setup**: `npm install` + create `.env`
2. **Develop**: Edit TypeScript files in `src/`
3. **Test**: `npm start` or `npm run type-check`
4. **Build**: `npm run build`
5. **Deploy**: Use compiled files from `dist/`

---

## 🔐 Security Notes

### Files to NEVER commit:
- `.env` (contains private key)
- `node_modules/` (dependencies)
- `dist/` (build output)

### Files to ALWAYS commit:
- `.env.example` (template)
- All `src/**/*.ts` files
- `package.json`, `tsconfig.json`
- Documentation files

---

## 📚 Related Documentation

- Main README: `README.md`
- Quick Start: `QUICKSTART.md`
- Official Docs: https://docs.lens.xyz

---

**Last Updated**: November 2025
