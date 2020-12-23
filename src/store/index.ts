import { createStore } from 'vuex'
import ItemInterface from '@/types/item'
import HistoryInterface from "@/types/history";

export default createStore({
  state: {
    items: [] as ItemInterface[],
    selected: [] as string[],
    history: [] as HistoryInterface[],
  },
  mutations: {

    SET_ITEMS(state, data: []) {
      state.items = data
    },

    ADD_SELECTED (state, id: string): void {
      state.selected.push(id)
    },

    REMOVE_SELECTED (state, id: string): void {
      const indexEl = state.selected.indexOf(id)
      state.selected.splice(indexEl, 1)
    },

    ADD_HISTORY (state, payload: HistoryInterface): void {
      state.history.push(payload)
    },
  },

  actions: {
    fetchData(context) {
      fetch('https://my.api.mockaroo.com/bell_test_vue.json?key=0fcf2830')
          .then(response => response.json())
          .then(data => context.commit('SET_ITEMS', data));
    },

    addToSelected(context, item: ItemInterface): void {
      context.commit('ADD_SELECTED', item.id)
      context.commit('ADD_HISTORY', {
        item,
        action: 'add',
        created: new Date()
      })
    },

    removeFromSelected(context,  item: ItemInterface): void {
      context.commit('REMOVE_SELECTED', item.id)
      context.commit('ADD_HISTORY', {
        item,
        action: 'remove',
        created: new Date()
      })
    },
  },
})
