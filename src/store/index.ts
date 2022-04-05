import {createStore} from 'vuex'
import ItemInterface from '@/types/item'
import {MutationTypes} from '@/types/mutation-types'
import {HistoryActionTypes} from '@/types/history-action-types'
import {ActionTypes} from '@/types/action-types'
import HistoryInterface from '@/types/history'

import api from '@/api'

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
      api.fetchItems().then(data => context.commit(MutationTypes.SET_ITEMS, data))
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

          // Подсчет вхождений дочерних элементов при поиске
          .map(item => ({
            ...item,
            countItems: item.countItems + item.items.filter((el: ItemInterface) => {
              return el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
            }).length
          }))

          // Вывод только тех которые подходят под условия поиска либо есть совпадения по дочерним
          .filter(item => item.countItems > 0 || item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)

          // Сортировка по найденым вхождениям
          .sort((a, b) => b.countItems - a.countItems)
      }

      return elems
    }
  }

})
