import React, { useState, useEffect} from 'react'

export default function App() {
  /* 
    useState是一个方法，这个方法的参数就是默认值，结果是一个数组，数字的第一个值相当于state， 第二个相当于setState
    useEffect的参数是一个回调，不管是组件挂载还是更新,都会出发这个回调方法，类似于componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
  */
  const [count, setCount ] = useState(0)
  const [title, setTitle ] = useState('名称')
  useEffect(() => {
    console.log('更新了')
    document.title = `当前count值是：${count}`
  })
  return (
    <div>
      <p>当前count值是：{count}</p>
      <button onClick={() => setCount(x => x - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      
      {/* <p>{title}</p> */}
    </div>
  )
}
