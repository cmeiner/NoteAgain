import Toast from 'react-native-toast-message';
import { toastMessage, ToastType } from './ToastTypes';

export const showToast = (toastType: ToastType) => {
  Toast.show({
    type: 'success',
    text1: toastMessage(toastType),
    position: 'bottom',
    autoHide: true,
    visibilityTime: 1000,
  });
};
