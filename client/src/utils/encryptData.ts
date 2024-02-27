import * as CryptoJS from 'crypto-js';
import { getLocalStorageItem } from './localStorage';

export function setEncryptedData(data: any, keyName: string) {
  let _key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;

  const parsed_value = JSON.stringify(data);
  const encrypted_value = CryptoJS.AES.encrypt(parsed_value, _key).toString();
  const stored_value = localStorage.setItem(keyName, encrypted_value);

  return stored_value;
};

export function getEncryptedData(keyName: string) {
  let _key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;

  const stored_value: string | null = getLocalStorageItem(keyName);
  if(stored_value !== null){
    const decrypted_value = CryptoJS.AES.decrypt(stored_value, _key).toString(CryptoJS.enc.Utf8);
    const parsed_value: any = decrypted_value !== null ? JSON.parse(decrypted_value) : null;
  
    return parsed_value;
  }
}