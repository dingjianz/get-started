import React, { Component } from 'react'
import './index.scss'

class CssIndex extends Component {
  state = {
    // list: new Array(6)
    list:[1,1,1,1,1]
  }
  render() {
    const { list } = this.state
    console.log({list})
    return (
        <>
          <div className="card-container">
          <div className="card">
            <div className="front">
              <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
            </div>
            <div className="back">
              <div>
                <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
                <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
                <button className="button">Click Here</button>
              </div>
            </div>
          </div>
        </div>
        <ul className="accordion-container">
          <li className="accordion-item active">
            <div className="title">1</div>
          </li>
          <li className="accordion-item">
            <div className="title">2</div>
          </li>
          <li className="accordion-item">
            <div className="title">3</div>
          </li>
        </ul>

        <ul className="item-ul">
        {
          list.map((item, index) => {
            console.log(index)
            return <li className="item" key={index}>{index}</li>
          })
        }
          
        </ul>
      </>
    )
  }
}

export default CssIndex
