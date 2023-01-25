import * as Notifications from 'expo-notifications';

export async function addNotification(date: Date, title: string) {
  // create a new date object with the time 10 minutes before the provided date
  const triggerDate = new Date(date.getTime() - 10 * 60 * 1000);

  const schedulingOptions = {
    hour: triggerDate.getHours(),
    minute: triggerDate.getMinutes(),
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
    },
    trigger: schedulingOptions,
  });
}

export async function removeNotifcation(title: string, date?: Date) {
  const scheduledNotifications: any =
    await Notifications.getAllScheduledNotificationsAsync();
  const triggerDate = new Date(date.getTime() - 10 * 60 * 1000);
  for (const noti of scheduledNotifications) {
    const notiHour = noti.trigger.dateComponents.hour;
    const notiMin = noti.trigger.dateComponents.minute;
    const notiTitle = noti.content.title;

    if (
      notiHour === triggerDate.getHours() &&
      notiMin === triggerDate.getMinutes() &&
      notiTitle === title
    ) {
      await Notifications.cancelScheduledNotificationAsync(noti.identifier);
    }
  }
}
