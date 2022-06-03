export class EncryptUtil {
  // 加密
  static BinaryEncrypt(buf: Uint8Array): Uint8Array {
    for (let i = 0; i < buf.length; ++i) {
      buf[i] -= 1;
    }
    return buf;
  }

  // 解密
  static BinaryEdecrypt(buf: Uint8Array): Uint8Array {
    for (let i = 0; i < buf.length; ++i) {
      buf[i] += 1;
    }
    return buf;
  }
}