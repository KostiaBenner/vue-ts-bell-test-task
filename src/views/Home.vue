<template>
  <div class="home">
    <div class="listing">
      <div class="listing__column">
        <div class="listing-search">
          <input v-model="search" placeholder="Поиск" type="text" class="listing-search__input">
        </div>
        <div class="listing-item" v-for="(item, index) in items" :key="index">
          <span>
            {{ item.name }}
            <span v-if="item.countItems">({{ item.countItems || 0 }})</span>
          </span>
          <span class="listing-item__subitems">{{ item.items.map(i => i.name).join(', ') }}</span>
          <span @click="addToSelected(item)" class="listing-item__btn-add">+</span>
        </div>
      </div>
      <div class="listing__column">
        <div class="listing-item listing-item_mod_removed" v-for="(item, index) in selected" :key="index">
          <span @click="removeFromSelected(item)" class="listing-item__btn-remove">-</span>
          <span>{{ item.name }}</span>
          <span class="listing-item__subitems">{{ item.items.map(i => i.name).join(', ') }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import ItemInterface from '@/types/item'
import store from "@/store"
import {defineComponent} from "vue";

export default defineComponent({

  data() {
    return {
      search: '' as string,
    }
  },

  computed: {

    selected(): ItemInterface[] {
      const selectedArr: any[] = store.state.selected
      return store.state.items.filter((item: ItemInterface) => {
        return selectedArr.indexOf(item.id) !== -1
      })
    },

    items(): ItemInterface[] {

      const search: string = this.search;
      const selectedArr: any[] = store.state.selected

      let elems: ItemInterface[] = store.state.items.filter((item: ItemInterface) => selectedArr.indexOf(item.id) == -1)

      if (search) {
        elems = elems
            
          .map((item: any) => {
            const countItems: number = item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ? 1 : 0
            const newItem: ItemInterface = {
              ...item,
              countItems: countItems
            }
            return newItem;
          })

          // Подсчет вхождений дочерних элементов при поиске
          .map((item: any) => {
            return {
              ...item,
              countItems: item.countItems + item.items.filter((el: any) => {
                return el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
              }).length
            }
          })

          // Вывод только тех которые подходят под условия поиска либо есть совпадения по дочерним
          .filter((item: any) => {
            return item.countItems > 0 || item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
          })

          // Сортировка по найденым вхождениям
          .sort((a, b) => b.countItems - a.countItems);

      }

      return elems
    }
  },

  methods: {
    ...mapActions(['addToSelected', 'removeFromSelected']),
  }
})
</script>

<style lang="scss">
.listing {
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  justify-content: center;

  &__column {
    margin: 0 20px;
    border: 1px solid #EEE;
    flex: 0 0 calc(50% - 40px);
  }

  &-item, &-search {
    padding: 15px;
    border-bottom: 1px solid #EEE;
    text-align: left;
    box-sizing: border-box;
  }

  &-item {
    position: relative;

    &_mod_removed {
      padding-left: 45px;
    }

    &__subitems {
      font-size: 12px;
      margin-left: 12px;
      color: #DDD;
    }

    &__btn-add, &__btn-remove {
      width: 25px;
      height: 25px;
      font-weight: bold;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 5px;
      background: #DDD;
      opacity: 0.5;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: normal;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    &__btn-remove {
      left: 10px;
    }

  }

  &-search {
    &__input {
      display: block;border: none;
      background: #EEE;
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
    }
  }

}
</style>
