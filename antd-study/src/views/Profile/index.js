import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Upload, Card, Button, Icon } from 'antd'
import { uploadImg } from '../../api/common'
import { changeAvatar } from '../../store/actions/userAction'
import _ from 'lodash'
import { Map, List, fromJS } from 'immutable'

const mapStateToProps = state => {
  return {
    avatar: state.userReducer.avatar
  }
}

@connect(mapStateToProps, { changeAvatar })
class Profile extends Component {
  state = {
    isUploading: false
  }

  handleUpload = (arg) => {
    this.setState({
      isUploading: true
    })
    const data = new FormData()
    data.append('Token', 'fba9dea75c5773b9bbab4bf11ca5d35036f12acb:S-LZNq_wjF9l9i0GOx9Uz3EXZII=:eyJkZWFkbGluZSI6MTU4MDc0MTAyOCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA4NzAzIiwiYWlkIjoiMTY2MTkzOCIsImZyb20iOiJmaWxlIn0=')
    data.append('file', arg.file)
    console.log(data)
    uploadImg(data).then(res => {
      if (res.status) {
        this.setState({
          isUploading: false
        })
        this.props.changeAvatar(res.data.linkurl)
        message.success('图片上传成功')
      } else {
        message.error('图片上传失败')
      }
    }).finally(() => {
      this.setState({
        isUploading: false
      })
    })
  }


  render() {
    // lodash深拷贝学习
    const firObj = {
      name: 'tom',
      todos: ['敲代码', '吃饭', '睡觉']
    }
    let newObj = Object.assign({}, firObj) // 浅拷贝
    let lodObj = _.cloneDeep(firObj) // 深拷贝

    firObj.todos.push('sks')
    // console.log({newObj, lodObj})

    // ------------------------------------------------------------
    // immutable学习
    // Map可以理解为做对象的
    const state = {
      a: 1,
      b: 2,
      c: 3
    }
    const imState_1 = Map(state)
    // console.log(state.a, imState_1.get('a')) // 1, 1 
    const imState_2 = imState_1.set('b', 2) // 返回新的对象
    // console.log(imState_1 === imState_2) // true immutable：设置的值相同引用的地址就不变，哪个值修改了就重新单独为那个值开辟新的内存地址

    const map_1 = Map({a:1, b:2, c:3})
    const map_2 = Map({a:1, b:2, c:3})
    console.log(map_1 === map_2) // false
    console.log(map_1.equals(map_2)) // true

    

    // List做数组的
    const imList_1 = List([1,2])
    const imList_2 = imList_1.push()
    // console.log(imList_1 === imList_2) // true
    const imList_3 = imList_1.push(3, 4, 5)
    // console.log(imList_1.get(4), imList_3.get(4)) // undefined, 5

    // fromJS复杂数据类型
    const imObj_1 = fromJS(firObj)
    // console.log(imObj_1.get('todos').get(0)) 等同于下面的 getIn
    console.log(imObj_1.getIn(['todos', 1]))
    const imObj_2 = imObj_1.setIn(['firObj', 'x' , 'y'], 100)
    /* 
      {
        name: 'tom',
        todos: ['敲代码', '吃饭', '睡觉'],
        x: {
          y: 100,
          z: 808
        }
      }
    */
    console.log(imObj_2.getIn(['firObj', 'x' , 'y']))
    // console.log(imObj_2.toJS().firObj.x.y) // 等同于上面

    const imObj_3 = imObj_1.updateIn(['firObj', 'x' , 'z'], v => v=808)
    console.log(imObj_3.getIn(['firObj', 'x' , 'z']))


    
// ------------------------------------------------------------


    const { isUploading } = this.state
    return (
      <Card
        title='个人设置'
        bordered={false}
      >
        <Upload
          showUploadList={false}
          disabled={isUploading}
          openFileDialogOnClick={true}
          customRequest={this.handleUpload}
        
        >
          <div
            style={{
              display: 'block',
              width: '150px',
              height: '150px',
              border: '1px dashed #dedede',
              lineHeight: '150px',
              textAlign: 'center'
            }}
          >
            {
              this.props.avatar
              ?
              <img src={this.props.avatar} alt="loading..." style={{width:'148px',height: '148px'}}/>
              :
              <Button>
                <Icon type='upload' />点击上传
              </Button>
            }
          </div>
        </Upload>
      </Card>
    )
  }
}


export default Profile