/**
 * Helper utilities cho Lens Protocol application
 */

/**
 * Format địa chỉ Ethereum (hiển thị ngắn gọn)
 * @param address - Địa chỉ Ethereum
 * @param length - Độ dài hiển thị mỗi bên (mặc định: 4)
 */
export function formatAddress(address: string, length: number = 4): string {
  if (!address) return "";
  if (address.length < length * 2 + 2) return address;
  
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

/**
 * Validate Ethereum address
 * @param address - Địa chỉ cần validate
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format timestamp thành readable date
 * @param timestamp - Unix timestamp (seconds)
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("vi-VN");
}

/**
 * Sleep helper (cho retry logic)
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry logic cho async operations
 * @param fn - Async function to retry
 * @param maxRetries - Max số lần retry
 * @param delay - Delay giữa các lần retry (ms)
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        console.log(`Retry ${i + 1}/${maxRetries}...`);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
}

/**
 * Parse Lens handle (remove @ if present)
 * @param handle - Lens handle
 */
export function parseHandle(handle: string): string {
  return handle.startsWith("@") ? handle.slice(1) : handle;
}

/**
 * Format Lens handle (add @ if not present)
 * @param handle - Lens handle
 */
export function formatHandle(handle: string): string {
  return handle.startsWith("@") ? handle : `@${handle}`;
}

/**
 * Check if string is valid Lens handle format
 * @param handle - Handle to validate
 */
export function isValidHandle(handle: string): boolean {
  // Basic validation: alphanumeric, underscore, hyphen, 3-31 chars
  const cleanHandle = parseHandle(handle);
  return /^[a-z0-9_-]{3,31}$/.test(cleanHandle);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Max length
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Format number with commas
 * @param num - Number to format
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Convert wei to GRASS (native token)
 * @param wei - Wei amount (string or bigint)
 */
export function weiToGrass(wei: string | bigint): string {
  const amount = typeof wei === "string" ? BigInt(wei) : wei;
  const divisor = BigInt(10 ** 18);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  
  return `${integerPart}.${fractionalPart.toString().padStart(18, "0").slice(0, 4)}`;
}
