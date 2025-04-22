// src/utils/hash.ts
import CryptoJS from 'crypto-js';

// 功能：计算文件的 SHA-256 哈希值（支持大文件分片处理）
export const calculateFileHash = async (file: File): Promise<string> => {
    const chunkSize = 10 * 1024 * 1024; // 分片10MB
    const chunks = Math.ceil(file.size / chunkSize);
    let hash = CryptoJS.algo.SHA256.create();

    for (let i = 0; i < chunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        const arrayBuffer = await chunk.arrayBuffer();
        const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(arrayBuffer));
        hash.update(wordArray);
    }

    return hash.finalize().toString(CryptoJS.enc.Hex);
};