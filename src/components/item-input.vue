<template>
  <div class="todo-list__input">
    <input
      type="text"
      placeholder="请输入，回车"
      v-model="inputValue"
      @keyup.enter="addItem"
    >
  </div>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

export default createComponent({
  props: {
    selected: Object
  },

  setup ({ selected }, context) {
    // console.log(context)
    const inputValue = ref('')
    watch(() => {
      if (selected) {
        inputValue.value = selected.content
      }
    })

    const addItem = () => {
      context.emit('add-item', {
        id: Date.now(),
        content: inputValue.value,
        status: 0
      })
      inputValue.value = ''
    }

    return {
      inputValue,
      addItem
    }
  },

  methods: {
  }
})
</script>

<style lang="less">
.todo-list {
  &__input {
    display: flex;
    margin-bottom: 30px;
  }
  input {
    flex-grow: 1;
    margin: 0;
    padding: 0;
    border: 1px #eee solid;
    height: 45px;
    font-size: 16px;
    padding: 0 15px;
    &:focus {
      outline: none;
    }
  }
}
</style>
