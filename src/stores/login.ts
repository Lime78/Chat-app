import { ObjectId } from 'mongodb';
import { create } from 'zustand';

interface User {
    _id: ObjectId
    username: string
  }

  interface UserState {
    username: string
    userId: string | null
    isLoggedIn: boolean
    login: (username: string, userId: string) => void
    logout: () => void
    isGuest: boolean
    loginAsGuest: () => void
    users: User[]
    setUsers: (users: User[]) => void
  }

  export const useUserStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    username: '',
    userId: null,
    isGuest: false,
    isLoggedIn: false,
    login: (username, userId) => set({ username, userId, isLoggedIn: true }),
    loginAsGuest: () =>
      set({ username: 'Guest', userId: null, isLoggedIn: true, isGuest: true }),
    logout: () =>
      set({ username: '', userId: null, isLoggedIn: false, isGuest: false }),
  }))