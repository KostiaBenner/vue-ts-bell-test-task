<template>
  <div class="history-item">

    <div class="history-item__title">{{ item.item.name }} <span class="history-item__id">{{ item.item.id }}</span></div>

    <span class="history-item__action" :class="{'history-item__action_mod_add': item.action === 'add'}">
        {{ item.action === 'add' ? 'добавлен в список':'удален из списка' }} {{createdString(item.created)}}
    </span>

  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import HistoryInterface from "../types/history";
import moment from 'moment';

export default defineComponent({
  name: "HistoryItem",
  props: {
    item: {
      type: Object as PropType<HistoryInterface>,
      required: true
    }
  },
  methods: {
    createdString(date: string): string {
      return moment(date).format('DD.MM.YYYY, HH:mm')
    }
  }
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
