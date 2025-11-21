/**
 * Application constants
 */

/**
 * Lens Chain Testnet information
 */
export const LENS_CHAIN_TESTNET = {
  CHAIN_ID: 37111,
  CHAIN_NAME: "Lens Chain Testnet",
  NATIVE_CURRENCY: {
    NAME: "Grass",
    SYMBOL: "GRASS",
    DECIMALS: 18,
  },
  RPC_URL: "https://rpc.testnet.lens.dev",
  BLOCK_EXPLORER: "https://scan.testnet.lens.dev",
  API_URL: "https://api.testnet.lens.xyz/graphql",
} as const;

/**
 * Lens Chain Mainnet information (for future reference)
 */
export const LENS_CHAIN_MAINNET = {
  CHAIN_ID: 37111, // TBD
  CHAIN_NAME: "Lens Chain",
  NATIVE_CURRENCY: {
    NAME: "Grass",
    SYMBOL: "GRASS",
    DECIMALS: 18,
  },
  // RPC_URL: "TBD",
  // BLOCK_EXPLORER: "TBD",
  // API_URL: "TBD",
} as const;

/**
 * Application configuration
 */
export const APP_CONFIG = {
  NAME: "Lens Builder Environment",
  VERSION: "1.0.0",
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Validation rules
 */
export const VALIDATION = {
  HANDLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 31,
    PATTERN: /^[a-z0-9_-]{3,31}$/,
  },
  ADDRESS: {
    PATTERN: /^0x[a-fA-F0-9]{40}$/,
    LENGTH: 42, // including '0x' prefix
  },
  PRIVATE_KEY: {
    LENGTH: 66, // including '0x' prefix
    PATTERN: /^0x[a-fA-F0-9]{64}$/,
  },
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NO_PRIVATE_KEY: "WALLET_PRIVATE_KEY not found in .env file",
  INVALID_PRIVATE_KEY: "Invalid private key format",
  INVALID_ADDRESS: "Invalid Ethereum address",
  INVALID_HANDLE: "Invalid Lens handle format",
  AUTH_FAILED: "Authentication failed",
  NETWORK_ERROR: "Network error occurred",
  TIMEOUT: "Request timeout",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  AUTH_SUCCESS: "Authentication successful",
  PROFILE_CREATED: "Profile created successfully",
  POST_CREATED: "Post created successfully",
  FOLLOWED: "Followed successfully",
  UNFOLLOWED: "Unfollowed successfully",
} as const;

/**
 * API endpoints (relative to base API URL)
 */
export const API_ENDPOINTS = {
  GRAPHQL: "/graphql",
} as const;

/**
 * Storage keys (for future localStorage/cache usage)
 */
export const STORAGE_KEYS = {
  SESSION_TOKEN: "lens_session_token",
  WALLET_ADDRESS: "lens_wallet_address",
  LAST_PROFILE: "lens_last_profile",
} as const;
