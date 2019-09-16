<template>
  <div class="todo-list">
    <item-input
      :selected="selected"
      @add-item="addItem"
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
import { ref, reactive, createComponent, toRefs, watch } from '@vue/composition-api'
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
    let list = reactive([
      reactive({
        id: 1,
        content: '计划内容、干什么事情',
        status: ref(1)
      }),
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
    ])
    // .map(item => reactive(item))
    const delItem = (item: TodoItem) => {
      const index = list.findIndex(x => x.id === item.id)
      if (index > -1) {
        list.splice(index, 1)
      }
    }
    const changeIndex = (nI: number, oI: number) => {
      arrayMove(list, nI, oI)
    }

    watch(() => {
      console.log('====', list[0])
    })

    watch (selected, (val) => {
      console.log(val)
    })

    setTimeout(() => {
      list[0] = reactive({
        id: 11,
        content: '计划内容、干什么事情',
        status: ref(1)
      })
      console.log('change', list[0].status)
    }, 1000)

    const addItem = (item: TodoItem) => {
      list.push(item)
    }

    return {
      selected,
      list,
      delItem,
      changeIndex,
      addItem
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
