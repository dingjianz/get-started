import React, { useState, useEffect, useRef } from 'react'
import { Icon, Button, Input, Select, message } from 'antd'
const InputGroup = Input.Group
import ReplyMessage from './ReplyMessage'

function CreateRule (props) {
  const [createKeywordList, setKeywordList] = useState([{match: '1', keyword: ''}])
  const [name, setName] = useState('')
  const [ruleContent, setRuleContent] = useState('')

  const iptRef = useRef()

  useEffect(() => {
    iptRef.current.state.value = ''
    setKeywordList([])
    setName('')
    setRuleContent('')
  }, [props.visible])

  useEffect(() => {
    console.log(props.replyContent)
  }, [props.replyContent])

  const handleSetKeyword = (type, index) => {
    if (createKeywordList.length<10 && type==='add') createKeywordList.push({match: '1', keyword: ''})
    if (type==='reduce') createKeywordList.splice(index, 1)
    setKeywordList([...createKeywordList])
  }

  const handleKeywordChange = (keyword, index) => {
    createKeywordList[index]['keyword'] = keyword
    setKeywordList([...createKeywordList])
  }

  const handleMatchChange =(matchVal, index) => {
    createKeywordList[index]['match'] = matchVal
    setKeywordList([...createKeywordList])
  }

  const submit = () => {
    if (!name) return message.warning('请输入规则名称！')
    if (createKeywordList.length < 1) return message.warning('请设置关键词！')
    const flag = createKeywordList.some((item) => !item.keyword)
    if (flag) return message.warning('请输入关键词！')
    if (!ruleContent) return message.warning('请选择回复内容！')
  }

  return (
    <div className="bi-wrap">
    <div className="bi-header">
      <span className="bi-back" onClick={props.handleClose}><Icon type="left"/>返回</span>
      新建关键词回复规则
    </div>
    <div className="bi-content">
      <div className="set-item">
        <span className="set-name">规则名称:</span>
        <Input
          className="set-content"
          placeholder="输入最多20个字符"
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
          ref={iptRef}
        />
      </div>
      <div className="set-item">
        <span className="set-name">设置关键词:</span>
        <div className="set-content">
          <Button
            type="primary"
            ghost icon="plus"
            onClick={handleSetKeyword.bind(this, 'add')}
            disabled={createKeywordList.length > 9}
          >加一条</Button>
          <p className="create-tip">创建<a>自动标签</a>规则，可以根据关键词将粉丝分类。关键词最多可添加10条</p>
          {
            createKeywordList.map((keyIt, index) => {
              return (
                <InputGroup compact key={index} className="ipt-group">
                  <Select defaultValue="1" onChange={(value) => handleMatchChange(value, index)}>
                    <Option value="1">包含匹配</Option>
                    <Option value="2">完全匹配</Option>
                  </Select>
                  <Input
                    onChange={(e) => handleKeywordChange(e.target.value, index)}
                    style={{ width: '70%' }}
                    placeholder="输入关键词"
                    addonAfter={<a onClick={handleSetKeyword.bind(this, 'reduce', index)}>删除</a>}
                  />
                </InputGroup>
              )
            })
          }
        </div>
      </div>
      <div className="set-item">
        <span className="set-name">回复内容:</span>
        <div>
        <ReplyMessage 
          replyContent={props.replyContent}
        />
        <Button type="primary" ghost onClick={props.openModal}>设置回复内容</Button>
        </div>
      </div>
      </div>
      <div className="set-footer">
        <Button>删除</Button>
        <Button type="primary" onClick={submit.bind(this)}>保存</Button>
      </div>
    </div>
  )
}

export default CreateRule
