import Toast from 'react-native-toast-message';

type ToastType = 'edit' | 'new';

export const showToast = (toastType: ToastType) => {
  Toast.show({
    type: 'success',
    text1:
      toastType === 'edit' ? 'Reminder updated 🙂' : 'New Reminder added 🙂',
    position: 'bottom',
    autoHide: true,
    visibilityTime: 1000,
  });
};
