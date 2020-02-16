import React, { Fragment} from 'react'

export default function WithCopyHOC(YourComponnet) {
  return  class WithCopyright extends React.Component {
    render () {
      console.log('props', this.props)
      return (
        <Fragment>
          <YourComponnet {...this.props}/>
          <div>&copy; 2019&emsp;科大讯飞 &nbsp;</div>
        </Fragment>
      )
    }
  }
}
