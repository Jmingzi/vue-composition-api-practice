<template>
  <div class="todo-list__wrap">
    <div
      v-for="(item, i) in list"
      :key="item.id"
      class="todo-list__item"
      :class="{
        selected: selected && selected.id === item.id,
        complete: item.status === 1
      }"
      :style="targetIndex === i ? finalPosition : null"
      @click="handleSelect(item)"
      @mousedown="e => handleDown(e, i)"
    >
      <span class="todo-list__opt" @click.stop="handleComplete(item)">
        <i
          class="xm"
          :class="{
            'xm-multiple-selected': item.status === 1,
            'xm-multiple-select': item.status !== 1
          }"
        />
      </span>
      <span class="todo-list__opt" @click.stop="handleDelete(item)"><i class="xm xm-delete"></i></span>
      <span class="todo-list__content">{{ item.content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext } from '@vue/composition-api'
import { TodoItem } from '../index'
import { useDrag } from '../assets/drag'

export default createComponent({
  props: {
    list: Array,
    selected: Object
  },

  model: {
    prop: 'selected'
  },

  setup ({ list }: { [k: string]: unknown }, context: SetupContext) {
    const handleSelect = (item: TodoItem) => {
      context.emit('input', item)
    }
    const handleComplete = (item: TodoItem) => {
      // 可以直接修改?
      item.status = item.status === 1 ? 0 : 1
    }
    const handleDelete = (item: TodoItem) => {
      context.emit('del-item', item)
    }
    const handleChange = (newIndex: number, oldIndex: number) => {
      context.emit('change-index', newIndex, oldIndex)
    }
    const { handleDown, targetIndex, finalPosition } = useDrag(handleChange)

    return {
      handleSelect,
      handleComplete,
      handleDelete,
      handleDown,
      targetIndex,
      finalPosition
    }
  }
})
</script>

<style lang="less">
.todo-list {
  &__wrap {
    margin: 0 auto;
    user-select: none;
  }
  &__opt {
    margin-right: 10px;
    cursor: pointer;
  }
  &__item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 10px;

    height: 60px;
    border-bottom: 1px #eee solid;
    &.selected {
      background-color: #f2f2f2;
    }
    &.complete .todo-list__content {
      text-decoration: line-through;
    }
    &.complete {
      color: #999;
    }
    &.dragging {
      position: fixed;
    }
  }
  &__content {
    font-size: 16px;
  }
}
</style>
