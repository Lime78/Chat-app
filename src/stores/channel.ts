import { ObjectId } from 'mongodb'
import { create } from 'zustand'

interface Channel {
  _id: ObjectId
  name: string
  isPrivate: boolean
}

interface ChannelState {
  name: string
  channelId: string | null
  channels: Channel[]
  setChannels: (channels: Channel[]) => void
}

export const useChannelStore = create<ChannelState>((set) => ({
  channels: [],
  setChannels: (channels) => set({ channels }),
  name: '',
  channelId: null,
  isPrivate: false,
}))