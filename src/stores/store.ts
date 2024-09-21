// src/stores.ts
import { create } from 'zustand';
import { AddTradeState, AuthStore, CardState, HomeStore, NewsStore, Settings, SettingsStore, TradesStore } from './interfaces';


const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  bankDetail: null,
  setUsers: (payload) => set({ user: payload }),
  setBankDetail: (payload) => set({ bankDetail: payload }),
}));



const useHomeStore = create<HomeStore>((set) => ({
  toprates: [],
  wallet: {airtimeBalance:0,cashBalance:0},
  setHomeData: (payload) => set({ toprates:payload.toprates, wallet:payload.wallet }),
}));



// News Store



const useNewsStore = create<NewsStore>((set) => ({
  news: [],
  setNews: (payload) => set({ news: payload }),
}));



// Card Store


const useCardStore = create<CardState>((set) => ({
  cards: [],
  card: [],
  tradeData: null,
  disableStatus: null,
  cardIDdata: null,
  codes: [],
  getcodes: null,
  delete_all_giftcards: null,
  delete_admin_card: null,
  list: null,
  our_rate: null,
  setCards: (payload) => set({ cards: payload }),
  addCard: (payload) => set((state) => ({ cards: [...state.cards, payload] })),
  setTradeData: (payload) => set({ tradeData: payload }),
  setDisableStatus: (payload) => set({ disableStatus: payload }),
  setCardIDData: (payload) => set({ cardIDdata: payload }),
  setCodes: (payload) => set({ codes: payload }),
  setGetCodes: (payload) => set({ getcodes: payload }),
  setDeleteAllGiftCards: (payload) => set({ delete_all_giftcards: payload }),
  setDeleteAdminCard: (payload) => set({ delete_admin_card: payload }),
  setList: (payload) => set({ list: payload }),
  setOurRate: (payload) => set({ our_rate: payload }),
  // Add more methods as needed
}));


// Add Trade Store



const useAddTradeStore = create<AddTradeState>((set) => ({
  giftCards: [],
  activeGiftCard: null,
  tradeTitle: '',
  tradeIcon: '',
  totalCardValue: 0,
  totalTransactionValue: 0,
  codes: [],
  setCodes: (payload) => set({ codes: payload }),
  setGiftCards: (payload) => set({ giftCards: payload }),
  setActiveGiftCard: (payload) => set({ activeGiftCard: payload }),
  setTradeTitle: (payload) => set({ tradeTitle: payload })
}));


// Trades Store




const useTradesStore = create<TradesStore>((set) => ({
  detailTrades: null,
  pendingTotalItems: 0,
  completedTotalItems:0,
  ongoingTotalItems:0,
  setDetailTrades: (payload) => set({ detailTrades: payload }),
  setPendingTotalItems: (payload) => set({ pendingTotalItems: payload }),
  setCompletedTotalItems: (payload) => set({ completedTotalItems: payload }),
  setOngoingTotalItems: (payload) => set({ ongoingTotalItems: payload }),
}));


const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,
  setSettings: (payload:Settings) => set({ settings: payload }),
}));




export { useAuthStore, useHomeStore,useNewsStore,useCardStore,useAddTradeStore,useTradesStore,useSettingsStore };
