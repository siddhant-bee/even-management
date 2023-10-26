
import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('userInfo', {
    
  state: () => ({
    user: null,
    ticketInfo: null, // info
  }),





  actions: {
    setUser(user) {
      this.user = user
    },
    logout() {
      this.user = null;
    },
    setticket(ticketInfo) {
      this.ticketInfo = ticketInfo
    }
    
  },

getters: {
    getUser() {
      return this.user;
    },   
    getticket(){
      return this.ticketInfo
    }
},

  persist: true,
});
