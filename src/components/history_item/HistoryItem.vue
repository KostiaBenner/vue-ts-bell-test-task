<template>
  <div class="history-item">

    <div class="history-item__title">{{ item.item.name }} <span class="history-item__id">{{ item.item.id }}</span></div>

    <span class="history-item__action" :class="{'history-item__action_mod_add': item.action === HistoryActionTypes.ADD_ACTION}">
        {{ item.action === HistoryActionTypes.ADD_ACTION ? 'добавлен в список':'удален из списка' }} {{ createdString(item.created) }}
    </span>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs, PropType} from "vue";
import HistoryInterface from "@/types/history";
import {HistoryActionTypes} from "@/types/history-action-types";

export default defineComponent({
  name: "HistoryItem",
  props: {
    item: {
      type: Object as () => HistoryInterface,
      required: true
    }
  },

  setup() {
    return {
      createdString: (date: string) => {
        return new Date(date).toLocaleString()
      },
      HistoryActionTypes
    }
  },
})
</script>

<style lang="scss" scoped>
.history-item {
  display: block;
  text-align: left;
  margin-bottom: 15px;

  &__title {
    font-weight: bold;
  }

  &__id {
    font-size: 12px;
    margin-left: 12px;
    color: #DDD;
  }

  &__action {
    color: red;
    margin-top: 5px;
    font-size: 12px;

    &_mod_add {
      color: green;
    }
  }

}
</style>
