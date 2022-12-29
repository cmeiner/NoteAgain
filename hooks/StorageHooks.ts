import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (email: string, password: string) => {
  try {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
  } catch (e) {
    console.log(e);
  }
};

export const checkUserData = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email !== null && password !== null) return true;
    return false;
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async () => {
  const email = await AsyncStorage.getItem('email');
  const password = await AsyncStorage.getItem('password');
  const data = { email: email, password: password };
  return data;
};

export const resetUserData = async () => {
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('password');
};
