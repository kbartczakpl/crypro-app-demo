export interface Crypto {
    id: string;
    api_symbol: string;
    name: string;
    symbol: string;
    large?: string;
    market_cap_rank?: number;
    thumb?: string;
    price?: CryptoPrice;
    [key: string]: any;
}
export interface CryptoPrice {
    usd: number;
    usd_24h_change: number;
}
