/**
 * * Status of shared reminders
 * ? pending
 * ? accepted
 * ? declined
 */
type Status = 'pending' | 'accepted' | 'declined';

/**
 * * Todo Data
 */
type Todo = {
  id: string;
  description: string;
  completed: boolean;
};

/**
 * * TodoList Data
 * ! Todo Data
 * TODO Share Data
 */
type TodoList = {
  id: string;
  description?: string;
  items: Todo[];
  creator: string;
  //   sharedWith: Share[];
};

/**
 * TODO Share Data
 *
 */
// type Share = {
//   senderID: string;
//   receiverID: string;
//   reminderType: string;
//   status: Status;
// };

/**
 * * Reminder Data
 * TODO Share Data
 */
export type Reminder = {
  id?: string;
  title: string;
  description: string;
  creator?: string;
  remindAt?: string;
  //sharedWith: Share[];
};

/**
 * * User Data
 * TODO Share Data
 * TODO TodoList Data
 * TODO Reminder Data
 * ? Should we TYPO ID ?
 */
type User = {
  //   id?: string;
  email: string;
  displayName: string;
  //   reminders: Reminder[];
  //   todos: TodoList[];
  //   receivedItems: {
  //     todos: TodoList[];
  //     reminders: Reminder[];
  //   };
  //   sharedItems: {
  //     todos: TodoList[];
  //     reminders: Reminder[];
  //   };
};
