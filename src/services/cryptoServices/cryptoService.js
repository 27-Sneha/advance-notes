import CryptoJS from "crypto-js";

export function getTextEncryption(text) {
  const plainText = typeof text === "string" ? text : JSON.stringify(text);
  return CryptoJS.AES.encrypt(
    plainText,
    process.env.REACT_APP_CRYPTO_KEY
  ).toString();
}

export function getTextDecryption(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.REACT_APP_CRYPTO_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}
