/**
 * Custom TypeScript types cho Lens Protocol application
 */

/**
 * Lens Profile structure
 */
export interface LensProfile {
  id: string;
  handle?: {
    localName: string;
    fullHandle: string;
  };
  metadata?: {
    name?: string;
    bio?: string;
    picture?: string;
    coverPicture?: string;
  };
  owner: string;
  stats?: {
    followers: number;
    following: number;
    posts: number;
  };
}

/**
 * Account with profiles
 */
export interface LensAccount {
  address: string;
  profiles: LensProfile[];
}

/**
 * Builder login credentials
 */
export interface BuilderCredentials {
  address: string;
}

/**
 * Authentication result
 */
export interface AuthResult {
  success: boolean;
  sessionClient?: any; // SessionClient type from SDK
  error?: string;
}

/**
 * Environment config
 */
export interface EnvironmentConfig {
  name: string;
  apiUrl: string;
  chainId: number;
}

/**
 * Transaction status
 */
export type TransactionStatus = 
  | "pending"
  | "success"
  | "failed"
  | "cancelled";

/**
 * Query result wrapper
 */
export interface QueryResult<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  hasMore: boolean;
  cursor?: string;
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  items: T[];
  pageInfo: PaginationInfo;
}
