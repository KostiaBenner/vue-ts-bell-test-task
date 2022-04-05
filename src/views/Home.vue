<template>
  <div class="home">
    <div class="listing">
      <div class="listing__column">
        <div class="listing-search">
          <input v-model="search" placeholder="Поиск" type="text" class="listing-search__input">
        </div>
        <ListItem v-if="items.length" v-for="(item, index) in items" :key="index" :item="item"/>
        <h3 v-if="!items.length">Ничего не найдено</h3>
      </div>
      <div class="listing__column">
        <ListItem v-if="selected.length" v-for="(item, index) in selected" selected :key="index" :item="item"/>
        <h3 v-else>Ничего не выбрано</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ItemInterface from '@/types/item'
import store from "@/store"
import {defineComponent, ref, computed} from "vue";
import ListItem from "@/components/ListItem.vue";

export default defineComponent({
  components: {ListItem},

  setup() {
    let search = ref<string>('')

    let selected = computed<ItemInterface[]>(() => store.getters.getSelectedItems())
    let items = computed<ItemInterface[]>(() => store.getters.getItemsBySearchWithoutSelected(search.value))

    return {
      search,
      selected,
      items
    }
  },
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

  &-search {
    padding: 15px;
    border-bottom: 1px solid #EEE;
    text-align: left;
    box-sizing: border-box;
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
