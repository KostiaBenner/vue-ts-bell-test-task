<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'Home'}">
        Список
      </router-link> |
      <router-link
          :disabled="!totalCount"
          :event="totalCount ? 'click' : ''"
          :to="{name: 'History'}">
        История
      </router-link> |
      <router-link
          :disabled="!selectedCount"
          :event="selectedCount ? 'click' : ''"
          :to="{name: 'HistorySelected'}"
      >
        История добавлений ({{ selectedCount }})
      </router-link> |
      <router-link
          :disabled="!removedCount"
          :event="removedCount ? 'click' : ''"
          :to="{name: 'HistoryRemoved'}"
      >
        История удалений ({{ removedCount }})
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import store from "@/store"
import {ActionTypes} from "@/types/action-types";
import {HistoryActionTypes} from "@/types/history-action-types";

export default defineComponent({
  created(): void {
    store.dispatch(ActionTypes.FETCH_DATA)
  },
  computed: {
    totalCount() {
      return store.getters.getHistoryItems().length
    },
    selectedCount() {
      return store.getters.getHistoryItems(HistoryActionTypes.ADD_ACTION).length
    },
    removedCount() {
      return store.getters.getHistoryItems(HistoryActionTypes.REMOVE_ACTION).length
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
