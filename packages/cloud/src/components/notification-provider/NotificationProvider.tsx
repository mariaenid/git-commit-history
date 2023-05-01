import React, { useState } from 'react';


export enum NotificationState {
  None,
  Success,
  Error
}
const NotificationContext = React.createContext({
  notification: NotificationState.None,
  notificationText: '',
  success: (arg: string) => { },
  error: (arg: string) => { },
  clear: (arg: string) => { },
});

const NotificationProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const [notification, setNotification] = useState<NotificationState>(NotificationState.None);
  const [notificationText, setNotificationText] = useState('');

  const success = (text: string) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(NotificationState.Success);
  };

  const error = (text: string) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(NotificationState.Error);
  };
  const clear = () => {
    setNotificationText('');
    setNotification(NotificationState.None);
  };

  return (
    <NotificationContext.Provider
      value={{
        success, error, clear, notification, notificationText,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;