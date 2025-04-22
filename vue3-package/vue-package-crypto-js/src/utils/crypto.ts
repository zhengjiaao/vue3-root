// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

interface AESParams {
    key: string;
    iv: string;
}

// 功能：实现文本的 AES-CBC 加密与解密。
export const aesEncrypt = (plaintext: string, { key, iv }: AESParams): string => {
    const keyWord = CryptoJS.enc.Utf8.parse(key);
    const ivWord = CryptoJS.enc.Utf8.parse(iv);
    return CryptoJS.AES.encrypt(plaintext, keyWord, { iv: ivWord }).toString();
};

export const aesDecrypt = (ciphertext: string, { key, iv }: AESParams): string => {
    const keyWord = CryptoJS.enc.Utf8.parse(key);
    const ivWord = CryptoJS.enc.Utf8.parse(iv);
    const bytes = CryptoJS.AES.decrypt(ciphertext, keyWord, { iv: ivWord });
    return bytes.toString(CryptoJS.enc.Utf8);
};