/**
 * * Status of shared reminders
 * ? pending
 * ? accepted
 * ? declined
 */
type Status = 'pending' | 'accepted';

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
  sharedWith?: Share[];
};

/**
 * * Todo Data
 */
export type Todo = {
  id?: string;
  desc: string;
  completed: boolean;
};

/**
 * TODO Share Data
 *
 */
export type Share = {
  itemID: string;
  receiverID: string;
  status: Status;
};

/**
 * * Reminder Data
 * TODO Share Data
 */
export type Reminder = {
  id?: string;
  title: string;
  description: string;
  createdBy?: string;
  remindAt?: Date | string;
  sharedWith?: Share[];
};

/**
 * * User Data
 * TODO Share Data
 * TODO TodoList Data
 * TODO Reminder Data
 * ? Should we TYPO ID ?
 */
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
