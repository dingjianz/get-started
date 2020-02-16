import React, { Component } from 'react'

// connect方法执行之后是一个高阶组件
import { connect } from 'react-redux'

import { incrementAmount, decrementAmount, decrementAmountAsync } from '../../store/actions/cartAction'

class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartList:[]
    }
  }

  render() {
    return (
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
            this.props.cartList.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => this.props.decrementAmountAsync(item.id)}>异步减少</button>
                    <button onClick={() => this.props.decrementAmount(item.id)}>-</button>
                    <span>{item.amount}</span>
                    <button onClick={() => this.props.incrementAmount(item.id)}>+</button>
                  </td>
                  <td></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

/**
 * mapStateToProps，这里的state实际上就i是store.getState()的值
 * 将状态map到组件props
 * @param {object} state
 */
const mapStateToProps = (state) => {
  // 这里return了什么，在组件里就可以通过this.props.xx 来获取
  return  {
    cartList: state.cartReducer
  }
}

/**
 * 将分发器map到组件props
 * @param {object} state
 */
const mapDispatchToProps = (dispatch) => {
  return {
    incrementAmount: (id) => dispatch(incrementAmount(id)),
    decrementAmount: (id) => dispatch(decrementAmount(id))
  }
}

/* 
  connect方法有四个参数，常用的参数就是前面两个：
    【1】第一个参数mapStateToProps，作用就是从store里把state注入到当前组件的props上
    【2】第二个参数可以是mapDispatchToProps，这个的主要作用是把action生成的方法注入到当前组件的props上，一般来说没必要这么用
    export default connect(mapStateToProps, mapDispatchToProps)(CartList)
*/
 // 直接第二个参数传递一个对象，这里面的参数就是actionCreator，只要传入了actionCreator，在组件内就通过this.props.actionCreator来调用，这样的话，在调用之后，那个actionCreator就会自动帮你把它内部的action dispatch出去
export default connect(mapStateToProps, { incrementAmount, decrementAmount, decrementAmountAsync })(CartList)
