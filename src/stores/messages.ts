import { create } from 'zustand'


export interface Message {
    _id: string
    content: string
    senderId: string
    recipientId?: string
    channelId?: string
    isDirectMessage: boolean
  }
  
  interface MessageState {
    messages: Message[]
    addMessage: (messages: Message) => void
    setMessages: (messages: Message[]) => void
  }
  
  export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
  
    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, message],
      })),
  
    setMessages: (messages) => set({ messages }),
  }))