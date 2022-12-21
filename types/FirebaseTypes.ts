type Reminder = {
    id: string;
    title: string;
    description: string;
    creator: string;
    remindAt: string;
    sharedWith: Share[ ];
}
type TodoList = {
    id: string;
    description?: string;
    items: Todo [ ];
    creator: string;
    sharedWith: Share[ ];
}
    
type Todo = {
    id: string;
    description: string;
    completed: boolean;
}
    
type Status = "pending" | "accepted" | "declined";

type Share = {
    senderID: string; 
    receiverID: string;
    reminderType: string;
    status: Status;
}
        
type User = {
    id: string;
    email: string;
    displayName: string;
    reminders: Reminder [ ];
    todos: TodoList [ ];
    receivedItems: {
        todos: TodoList [ ];
        reminders: Reminder [ ];
    };
    sharedItems: {
        todos: TodoList [ ];
        reminders: Reminder [ ];
    }
}