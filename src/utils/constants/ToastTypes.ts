export type ToastType =
  | 'newTodo'
  | 'editTodo'
  | 'deleteTodo'
  | 'newReminder'
  | 'editReminder'
  | 'deleteReminder'
  | 'accountCreated'
  | 'loginSuccesful'
  | 'logoutSuccesful'
  | 'displayNameUpdated'
  | 'emailUpdated'
  | 'passwordUpdated'
  | 'profilePictureUpdated';

export const toastMessage = (toastType: ToastType) => {
  switch (toastType) {
    case 'newTodo':
      return 'New to-do added 🙂';
    case 'editTodo':
      return 'To-do updated 🙂';
    case 'deleteTodo':
      return 'To-do deleted 🙂';
    case 'newReminder':
      return 'New reminder added 🙂';
    case 'editReminder':
      return 'Reminder updated 🙂';
    case 'deleteReminder':
      return 'Reminder deleted 🙂';
    case 'accountCreated':
      return 'New account created 🙂';
    case 'loginSuccesful':
      return 'Login succesful 🙂';
    case 'logoutSuccesful':
      return 'Logout succesful 🙂';
    case 'displayNameUpdated':
      return 'Displayname updated 🙂';
    case 'emailUpdated':
      return 'E-mail updated 🙂';
    case 'passwordUpdated':
      return 'Password updated 🙂';
    case 'profilePictureUpdated':
      return 'Profile picture updated 🙂';
  }
};
