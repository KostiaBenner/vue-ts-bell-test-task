<template>
  <div class="listing-item" :class="{'listing-item_mod_removed':selected}">
    <span v-if="selected" @click="removeFromSelected(item)" class="listing-item__btn-remove">-</span>
    <span>
      {{ item.name }}
      <span v-if="item.countItems">({{ item.countItems || 0 }})</span>
    </span>
    <span class="listing-item__subitems">{{ item.items.map(i => i.name).join(', ') }}</span>
    <span v-if="!selected" @click="addToSelected(item)" class="listing-item__btn-add">+</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import ItemInterface from "@/types/item";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/action-types";

export default defineComponent({
  name: "ListItem",

  props: {
    selected: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object as PropType<ItemInterface>,
      required: true
    }
  },

  setup() {
    return {
      ...mapActions([ActionTypes.ADD_SELECTED, ActionTypes.REMOVE_SELECTED]),
    }
  }
})
</script>

<style lang="scss" scoped>
.listing {
  &-item {
    position: relative;
    padding: 15px;
    border-bottom: 1px solid #EEE;
    text-align: left;
    box-sizing: border-box;

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
}
</style>
