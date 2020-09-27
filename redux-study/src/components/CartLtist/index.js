import React, { Component } from 'react'

import { incrementAmount, decrementAmount } from '../../store/actions/cartAction'
import { testAction } from '../../store/actions/testAction'

export default class CartLtist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartList:[]
    }
  }

  getState = () => {
    this.setState({
      cartList: this.props.store.getState().cartReducer
    })
  }

  componentDidMount () {
    this.getState()
    this.props.store.subscribe(this.getState)
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     cartList: props.store.getState().cartReducer
  //   }
  // }
  
  render() {
    const { cartList } = this.state;
    const { store } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>商品名称</th>
              <th>价格</th>
              <th>数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              cartList.map((item,index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => store.dispatch(decrementAmount(item.id))}>-</button>
                      <span>{item.amount}</span>
                      <button onClick={() => store.dispatch(incrementAmount(item.id))}>+</button>
                    </td>
                    <td></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button onClick={() => store.dispatch(testAction('我是修改以后的值'))} >点击发送reducer</button>
        <h1>{store.getState().testReducer.value}</h1>
      </>
    )
  }
}
