import React, { Component, Fragment } from 'react'
import { Counter, CountBtn } from './components'
import Picker, {SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react'

export default class App extends Component {

  onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji)
}

  render() {
    return (
      <Fragment>
        <CountBtn type="decrement">-</CountBtn>
        <Counter />
        <CountBtn type="increment">+</CountBtn>
        <Picker onEmojiClick={this.onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
      </Fragment>
    )
  }
}
