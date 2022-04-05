<template>
  <div class="history">
    <HistoryItem v-for="(item, index) in items" :key="index" :item="item"/>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import {computed, defineComponent} from "vue";
import HistoryInterface from "../types/history";
import HistoryItem from "@/components/history_item/HistoryItem.vue";

export default defineComponent({

  components: {HistoryItem},

  props: {
    historyType: {
      default: null
    },
  },

  setup(props) {
    const items = () => computed<HistoryInterface[]>(() => store.getters.getHistoryItems(props.historyType))

    return {
      items
    }
  }
})
</script>

<style lang="scss">
.history {
  margin: 0 auto;
  max-width: 1024px;
}
</style>
