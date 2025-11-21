import { Chain } from "viem";

// !!! QUAN TRỌNG: Bạn phải thay thế bằng RPC URL thật của mạng Lens Chain Testnet !!!
export const LENS_TESTNET_RPC = "https://rpc.testnet.lens.dev"; // Ví dụ minh họa

export const lensChainTestnet = {
    // Các thông số bạn cung cấp:
    id: 37111,
    name: "Lens Chain Testnet",
    nativeCurrency: {
        name: "Grass",
        symbol: "GRASS",
        decimals: 18,
    },
    // Thêm RPC URL để Viem biết cách kết nối
    rpcUrls: {
        default: {
            http: [LENS_TESTNET_RPC],
        },
    },
    // Tùy chọn: Thêm Block Explorer nếu bạn có
    blockExplorers: {
        default: {
            name: "LensScan",
            url: "https://scan.testnet.lens.dev" // Ví dụ minh họa
        }
    }
} as const satisfies Chain;