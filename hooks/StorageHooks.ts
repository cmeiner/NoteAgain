import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (email: string, password: string) => {
  try {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
  } catch (e) {
    // saving error
  }
};

export const checkUserData = async () => {
  try {
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    if (email !== null && password !== null) return true;
    return false;
  } catch (e) {}
};

export const getUserData = async () => {
  let email = await AsyncStorage.getItem('email');
  let password = await AsyncStorage.getItem('password');
  let data = { email: email, password: password };
  return data;
};

export const resetUserData = async () => {
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('password');
};
