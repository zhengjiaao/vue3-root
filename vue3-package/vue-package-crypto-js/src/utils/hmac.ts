// src/utils/hmac.ts
import CryptoJS from 'crypto-js';

export const generateHMAC = (data: string, secret: string): string => {
    return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Hex);
};