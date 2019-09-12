import { ref, onMounted, onUnmounted, reactive, Ref } from '@vue/composition-api'

export function useDrag (
  changeCallback: (newIndex: number, oldIndex: number) => void
): {
  handleDown: (e: MouseEvent, i: number) => void
  targetIndex: Ref<number>
  finalPosition: typeof finalPosition
} {
  let startX = 0
  let startY = 0
  const finalPosition = reactive({
    position: '',
    left: '',
    top: '',
    width: '',
    boxShadow: ''
  })
  // e.target 的类型如何写？
  let target: any = null
  let targetIndex: Ref<number> = ref(-1)
  let targetRect: ClientRect
  let targetWidth = 0

  const handleDown = (e: MouseEvent, i: number) => {
    startX = e.pageX
    startY = e.pageY
    target = e.target
    let n = 0
    while (!target.classList.contains('todo-list__item')) {
      target = target.parentNode
      n++
      if (n === 5) {
        console.log('结束循环')
        break
      }
    }

    targetIndex.value = i
    targetRect = target.getBoundingClientRect()
    targetWidth = target.parentNode.offsetWidth
  }

  const handleMove = (e: MouseEvent) => {
    if (target) {
      finalPosition.position = 'fixed'
      finalPosition.left = `${targetRect.left + e.pageX - startX}px`
      finalPosition.top = `${targetRect.top + e.pageY - startY}px`
      finalPosition.width = `${targetWidth}px`
      finalPosition.boxShadow = '0 0 5px rgba(0, 0, 0, .1)'
    }
  }

  const handleUp = (e: MouseEvent) => {
    if (target) {
      finalPosition.position = ''
      finalPosition.boxShadow = ''
      // 计算 final 最终在哪个节点附近
      let min = Number.MAX_SAFE_INTEGER
      let minIndex = -1
      let dir = ''
      const parent = target.parentNode
      Array.from<HTMLElement>(parent.children).forEach((node: HTMLElement, i: number) => {
        if (node !== target) {
          const nodeRect = node.getBoundingClientRect()
          // const itemTop = i < targetIndex.value ? nodeRect.top : nodeRect.top
          const itemTop = nodeRect.top
          const diff = parseInt(finalPosition.top) - itemTop - nodeRect.height / 2
          console.log(diff, i)
          if (
            Math.abs(diff) < min
            // Math.abs(diff) < node.offsetHeight
          ) {
            min = Math.abs(diff)
            minIndex = i
            dir = diff > 0 ? 'after' : 'before'
          }
        }
      })
      console.log(minIndex, dir)
      if (minIndex > -1) {
        let newIndex = minIndex
        if (dir === 'before' && minIndex === parent.children.length - 1) {
          newIndex -= 1
        } else if (minIndex === 0 && dir === 'after') {
          newIndex += 1
        } else if (minIndex === 1 && dir === 'before') {
          newIndex -= 1
        }
        // 此处的dom操作可以不用，利用数据更新
        // if (newIndex === parent.children.length - 1) {
        //   parent.appendChild(target)
        // } else {
        //   parent.insertBefore(target, parent.children[newIndex])
        // }
        if (newIndex !== targetIndex.value) {
          console.log(`${targetIndex.value} => ${newIndex}`)
          changeCallback(newIndex, targetIndex.value)
        }
      }
      target = null
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleUp)
  })

  return {
    handleDown,
    targetIndex,
    finalPosition
  }
}
