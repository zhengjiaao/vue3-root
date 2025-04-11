// src/utils/rsa.ts
import JSEncrypt from 'jsencrypt'

// 示例密钥（实际项目应从后端获取）
const PUBLIC_KEY = `
-----BEGIN RSA PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJ1V//2Hii7mL6wqEK78nkeqmb
k/aEIISGewjOhMzryhZ05tJKDIdibx3oBSzOfXkLVyypfWOLoov2QsTBwNCa67uU
TOlkUXJgJXgbiuwbeVHs7V7/rQ8QZqGq3wMBvy+iScjwMVE05fbg2kyTEWmTBy2f
+w8dm71Li+JVhoEniQIDAQAB
-----END RSA PUBLIC KEY-----
`

const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDJ1V//2Hii7mL6wqEK78nkeqmbk/aEIISGewjOhMzryhZ05tJK
DIdibx3oBSzOfXkLVyypfWOLoov2QsTBwNCa67uUTOlkUXJgJXgbiuwbeVHs7V7/
rQ8QZqGq3wMBvy+iScjwMVE05fbg2kyTEWmTBy2f+w8dm71Li+JVhoEniQIDAQAB
AoGAZp19eW5tpyjcWfGqPw068FcM9HR92R9PQbA8AgOyzA6q7DSOpedIzdsAsX4w
EavpZsKjimidu9igoEvCDWAirjmln83gvb54IPmdpwC/eDuzRxYl4OGK23vIg2rG
QI4EHB38ZbCB6rSCaiHtJuFBIQ+X54eZNhXUpc9izMbiyAECQQDVlGblo1kH4b6f
YS3RAOwnRk8Lhe0tTWZbDvNnM5Hr3mAeD43UvmupzSr8le+3O46MmPqUi5B0IadX
b93/s9MhAkEA8eu63jQRkBTIuYvEnmTwS4DO64VtKexX8GADuGWRuJsfXaEjkY8S
0flo4Qm7ZaxuryAdsMHk7vpkT+rIVuyvaQJAf9nBKs/4mKZC1Od4ZLeXpf8JjE1U
aB0AG5w8iletjzNj+Dq5XVPL4S6HAALFJ7uIHpPo1IkjJNGMeePmUY4U4QJBAK9c
ox6DO9/nUQE+0Y3HuW/htRyAoXrsOWqjDs9RwOnCeGAUeIYA4jGWy3Gk7lRrQ+hq
LVt9kYextZlApWxtMVECQQCsawtRarOwAHxjb9KsUlj8S/Wxh35Gj9SCwt6qSYBx
FL4TuTJxCeHykYFfquCB52BLJBR/ellYN8RE/WHbuF8D
-----END RSA PRIVATE KEY-----
`

// 公钥加密
export function encrypt(data: string): string | false {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    return encryptor.encrypt(data)
}

// 私钥解密（仅供演示，前端不应存私钥！）
export function decrypt(encrypted: string): string | false {
    const decryptor = new JSEncrypt()
    decryptor.setPrivateKey(PRIVATE_KEY)
    return decryptor.decrypt(encrypted)
}