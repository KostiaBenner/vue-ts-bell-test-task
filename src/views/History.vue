<template>
  <div class="history">
    <HistoryItem v-for="(item, index) in items" :key="index" :item="item"/>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import {defineComponent} from "vue";
import HistoryInterface from "../types/history";
import HistoryItem from "@/components/history_item/HistoryItem.vue";

export default defineComponent({
  components: {HistoryItem},

  props: {
    historyType: {
      default: null
    },
  },

  computed: {
    items(): HistoryInterface[] {
      return store.getters.getHistoryItems(this.historyType)
    },
  }
})
</script>

<style lang="scss">
.history {
  margin: 0 auto;
  max-width: 1024px;
}
</style>
