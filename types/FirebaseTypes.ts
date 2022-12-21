/**
 * * Status of shared reminders
 * ! pending
 * ! accepted
 * ! declined
 */
type Status = "pending" | "accepted" | "declined";

/**
 * * TodoList Data
 * ! Todo Data
 * ! Share Data
 */
type TodoList = {
  id: string;
  description?: string;
  items: Todo[];
  creator: string;
  sharedWith: Share[];
};

/**
 * * Todo Data
 */
type Todo = {
  id: string;
  description: string;
  completed: boolean;
};

/**
 * * Share Data
 * ! Status
 */
type Share = {
  senderID: string;
  receiverID: string;
  reminderType: string;
  status: Status;
};

/**
 * * Reminder Data
 * ! Share Data
 */
type Reminder = {
  id: string;
  title: string;
  description: string;
  creator: string;
  remindAt: string;
  sharedWith: Share[];
};

/**
 * * User Data
 * ! Share Data
 * ! TodoList Data
 * ! Reminder Data
 *
 */
type User = {
  id: string;
  email: string;
  displayName: string;
  reminders: Reminder[];
  todos: TodoList[];
  receivedItems: {
    todos: TodoList[];
    reminders: Reminder[];
  };
  sharedItems: {
    todos: TodoList[];
    reminders: Reminder[];
  };
};
