# @vue/composition-api 实践

根据提案衍生的体验包 `@vue/composition-api` 我们可以对 `v3.0` 的思想加以实践。

实践内容：实现一个 todo list，且列表可拖拽。

### 前期准备

1. 定义列表结构

```ts
type TodoItem = {
  id: number
  content: string
  status: 0 | 1
}

type TodoList = Array<TodoItem>
```

正常来说，我们会这样定义 `TodoList` 但是为了让