import EncryptStorage from 'encrypt-storage';

export const encryptStorage = EncryptStorage('secret_key', { storageType: 'sessionStorage' });
export const encryptLocalStorage = EncryptStorage('secret_key', {storageType: 'localStorage'});
