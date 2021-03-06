import {createStore} from 'vuex'
import ItemInterface from '@/types/item'
import {MutationTypes} from '@/types/mutation-types'
import {HistoryActionTypes} from '@/types/history-action-types'
import {ActionTypes} from '@/types/action-types'
import HistoryInterface from "@/types/history";

export default createStore({

  state: {
    items: [] as ItemInterface[],
    selected: [] as any[],
    history: [] as HistoryInterface[],
  },

  mutations: {

    [MutationTypes.SET_ITEMS](state, data: []): void {
      state.items = data
    },

    [MutationTypes.ADD_SELECTED](state, id: string): void {
      state.selected.push(id)
    },

    [MutationTypes.REMOVE_SELECTED](state, id: string): void {
      const indexEl = state.selected.indexOf(id)
      state.selected.splice(indexEl, 1)
    },

    [MutationTypes.ADD_HISTORY](state, payload: HistoryInterface): void {
      state.history.push(payload)
    },

  },

  actions: {

    [ActionTypes.FETCH_DATA](context, dispatch): void {
      fetch('https://my.api.mockaroo.com/bell_test_vue.json?key=0fcf2830')
        .then(response => response.json())
        .then(data => context.commit(MutationTypes.SET_ITEMS, data))
        .catch(error => dispatch['fetchLocalFromLocal'])
    },

    [ActionTypes.ADD_SELECTED](context, item: ItemInterface): void {
      context.commit(MutationTypes.ADD_SELECTED, item.id)
      context.commit(MutationTypes.ADD_HISTORY, {
        item,
        action: HistoryActionTypes.ADD_ACTION,
        created: new Date()
      })
    },

    [ActionTypes.REMOVE_SELECTED](context,  item: ItemInterface): void {
      context.commit(MutationTypes.REMOVE_SELECTED, item.id)
      context.commit(MutationTypes.ADD_HISTORY, {
        item,
        action: HistoryActionTypes.REMOVE_ACTION,
        created: new Date()
      })
    },
  },

  getters: {

    getHistoryItems: (state) => (type: HistoryActionTypes | null): HistoryInterface[] => {

      if (type) {
        return state.history.filter(item => item.action === type)
      }

      return state.history
    },

    getSelectedItems: (state) => (): ItemInterface[] => {
      return state.items.filter(item => state.selected.indexOf(item.id) !== -1)
    },

    getItemsBySearchWithoutSelected: (state) => (search: string): ItemInterface[] => {

      let elems = state.items.filter(item => state.selected.indexOf(item.id) == -1)

      if (search) {

        elems = elems

          .map(item => ({
            ...item,
            countItems: item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ? 1 : 0
          }))

          // ?????????????? ?????????????????? ???????????????? ?????????????????? ?????? ????????????
          .map(item => ({
            ...item,
            countItems: item.countItems + item.items.filter((el: ItemInterface) => {
              return el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
            }).length
          }))

          // ?????????? ???????????? ?????? ?????????????? ???????????????? ?????? ?????????????? ???????????? ???????? ???????? ???????????????????? ???? ????????????????
          .filter(item => item.countItems > 0 || item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)

          // ???????????????????? ???? ???????????????? ????????????????????
          .sort((a, b) => b.countItems - a.countItems)
      }

      return elems
    }
  }

})
