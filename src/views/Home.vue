<template>
  <div class="todo-list">
    <item-input
      :selected="selected"
      @add-item="item => { list.push(item) }"
    />

    <item-list
      v-model="selected"
      :list="list"
      @del-item="delItem"
      @change-index="changeIndex"
    />
  </div>
</template>

<script lang="ts">
import { ref, reactive, createComponent, toRefs } from '@vue/composition-api'
import ItemInput from '../components/item-input.vue'
import ItemList from '../components/item-list.vue'
import { TodoItem } from '../index'

const arrayMove = (arr: any, nI: number, oI: number) => {
  const val = arr[oI]
  if (oI > nI) {
    // 后面的数字向前移动
    for (let i = oI; i > nI; i--) {
      arr[i] = arr[i - 1]
    }
    arr[nI] = val
  } else {
    for (let i = oI; i < nI; i++) {
      arr[i] = arr[i + 1]
    }
    arr[nI] = val
  }
}

export default createComponent({
  name: 'home',

  components: {
    ItemInput,
    ItemList
  },

  setup (props, context) {
    const selected = ref(null)
    let list = [
      {
        id: 1,
        content: '计划内容、干什么事情',
        status: 1
      },
      {
        id: 2,
        content: '代码是写给人看的',
        status: 0
      },
      {
        id: 3,
        content: '脖子更酸了',
        status: 0
      }
    ].map(item => reactive(item))
    const delItem = (item: TodoItem) => {
      const index = list.findIndex(x => x.id === item.id)
      if (index > -1) {
        list.splice(index, 1)
      }
    }
    const changeIndex = (nI: number, oI: number) => {
      arrayMove(list, nI, oI)
    }

    return {
      selected,
      list,
      delItem,
      changeIndex
    }
  },

  methods: {
  }
})
</script>

<style lang="less">
.todo-list {
  width: 600px;
  margin: 100px auto;
}
</style>
