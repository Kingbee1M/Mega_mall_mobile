import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;   // date string
  read: boolean;
}

interface NotificationStore {
  notifications: NotificationItem[];

  addNotification: (title: string, message: string) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [{id: "1", title: "Greetings new comer", message: "Welcome to Mega Mall!", createdAt: new Date().toISOString(), read: false}],

      addNotification: (title, message) =>
        set((state) => ({
          notifications: [
            {
              id: Date.now().toString(),
              title,
              message,
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

        markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
            })),
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () =>
        set(() => ({
          notifications: [],
        })),
    }),

    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
