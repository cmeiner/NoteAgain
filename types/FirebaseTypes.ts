/**
 * * Status of shared reminders
 * ? pending
 * ? accepted
 * ? declined
 */
export type Status = 'pending' | 'accepted';

/**
 * * TodoList Data
 * ! Todo Data
 * TODO Share Data
 */
export type TodoList = {
  id?: string;
  title: string;
  items: Todo[];
  createdBy?: string;
  shareID?: string;
};

export type ItemType = 'reminders' | 'todos';

/**
 * * Todo Data
 */
export type Todo = {
  id?: string;
  desc: string;
  completed: boolean;
  share?: boolean;
};

/**
 * TODO Share Data
 *
 */
export type Share = {
  itemID: string;
  receiverID: string;
  itemType: ItemType;
  status: Status;
};

/**
 * * Reminder Data
 * TODO Share Data
 */
export type Reminder = {
  shareID?: string;
  id?: string;
  title: string;
  description: string;
  createdBy?: string;
  remindAt?: Date | string;
};

/**
 * * User Data
 * TODO Share Data
 * TODO TodoList Data
 * TODO Reminder Data
 * ? Should we TYPO ID ?
 */
export type UserType = {
  email?: string;
  displayName?: string;
  password?: string;
  profilePicture?: string;
};
// type User = {
//   //   id?: string;
//   email: string;
//   displayName: string;
//   //   reminders: Reminder[];
//   //   todos: TodoList[];
//   //   receivedItems: {
//   //     todos: TodoList[];
//   //     reminders: Reminder[];
//   //   };
//   //   sharedItems: {
//   //     todos: TodoList[];
//   //     reminders: Reminder[];
//   //   };
// };
