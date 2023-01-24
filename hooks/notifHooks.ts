import * as Notifications from 'expo-notifications';


export async function addReminderNotification(title, date) {
    await Notifications.scheduleNotificationAsync({
        content: { 
            title
        }, 
        trigger: { 
            hour: date.getHours(), 
            minute: date.getMinutes() 
        }
    });
}