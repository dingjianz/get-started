import React, { Component } from 'react'
import AwesomeSlider from 'react-awesome-slider'
import initFunction from '../../utils/functions'
import 'react-awesome-slider/dist/styles.css'

import './index.scss'

export default class index extends Component {
  constructor (props) {
    super(props)
    initFunction.call(this)
  }

  componentDidMount () {
    console.log(this)
  }

  render() {
    return (
      <div className="awe-slider" onContextMenu={this.handleContextMenu}>
        <div className="swiper-wrap">
          <AwesomeSlider bullets={false}>
            <div className="content-wrap">
              content-1
            </div>
            <div className="content-wrap">
              content-2
            </div>
          </AwesomeSlider>
        </div>
      </div>
    )
  }
}
