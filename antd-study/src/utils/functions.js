/**
 * 通过流程图中节点的所有操作
 */
import { message, Modal } from 'antd'
import { ProtocolType } from '../constant/schema'
import { protocolTypeOptions } from '../constant/select-options'

const { confirm } = Modal
// 将ProtocolType转成对象
let protocolTypeOptionsObj = {}
protocolTypeOptions.map((item) => {
  protocolTypeOptionsObj[item.value] = item.label
})

// 获取一个空节点
function getBlankNode (nodeType, id, options={}) {
  let nodeBlank
  switch (nodeType) {
    case 'task': {
      nodeBlank = {
        id: id,
        Type: "BlankTask",
        Comment: "空白节点：可拖拽服务至此",
        Resource: "",
        ...options
      }
      break
    }
    case 'choice': {
      nodeBlank = {
        id: id,
        Type: "Choice",
        Comment: "条件开始",
        Next: "",
        Choices: [],
        ...options
      }
      break
    }
    case 'parallel': {
      nodeBlank = {
        id: id,
        Type: "Parallel",
        Comment: "并行开始",
        Next: "",
        Branches: [],
        ...options
      }
      break
    }
  }
  return nodeBlank
}

// 插入一个节点
function addNode (nodeBlank, branchData, prevNodeId) {
  let nextNodeId 
  if (!prevNodeId) {
    // 是开始节点
    nextNodeId = branchData.StartAt
  } else {
    nextNodeId = branchData.States[prevNodeId].Next
  }

  if (!prevNodeId) {
    branchData.StartAt = nodeBlank.id
  } else {
    branchData.States[prevNodeId].Next = nodeBlank.id
    branchData.States[prevNodeId].End = false
    nodeBlank.fatherIds =  branchData.States[prevNodeId].fatherIds
    nodeBlank.fatherBranch =  branchData.States[prevNodeId].fatherBranch
    nodeBlank.Converge = branchData.States[prevNodeId].Converge
    branchData.States[prevNodeId].Converge = false
    nodeBlank.Prev = prevNodeId
  }
  if (!nextNodeId) {
    nodeBlank.End = true
    // nodeBlank.Next = 'm_endnode'
    // branchData.States['m_endnode'].Prev = nodeBlank.id
  } else {
    let nextNode = branchData.States[nextNodeId]
    nextNode.Prev = nodeBlank.id
    nodeBlank.Next = nextNodeId
    removeRelationship(nextNode)
  }
  branchData.States[nodeBlank.id] = nodeBlank
  return branchData
}
// 删除一个节点配置的与上一个节点间的节点关系
function removeRelationship (nodeData, type='$last') {
  if (nodeData.Type === 'Task') {
    if (nodeData.inputParamsTemp) {
      for (let p in nodeData.inputParamsTemp) {
        if (nodeData.inputParamsTemp[p][0] === type) {
          delete nodeData.inputParamsTemp[p]
        }
      }
    }
    if (nodeData.inputDataTemp) {
      for (let p in nodeData.inputDataTemp) {
        if (nodeData.inputDataTemp[p][0] === type) {
          delete nodeData.inputDataTemp[p]
        }
      }
    }
  } else if(nodeData.Type === 'Choice') {
    delete nodeData.variableTemp
    delete nodeData.fieldType
    delete nodeData.Default
    let choices = nodeData.Choices
    choices.map((item) => {
      delete item.compareType
      delete item.compareValue
    })
  } else if(nodeData.Type === 'Parallel') {
    delete nodeData.JoinType
  }
}
// 将一个节点改成空白节点
function changeNodeToBlankNode (nodeData) {
  let blankData = getBlankNode('task', nodeData.id, {
    Next: nodeData.Next,
    Prev: nodeData.Prev,
  })
  return blankData
}

// 获取一类节点存在的个数
function getNodeNum (modelData, nodeType) {
  let nodeNum = 0
  let currentId = modelData.StartAt
  let nodes = modelData.States
  while (currentId) {
    let node = nodes[currentId]
    if (node.Type === nodeType) {
      nodeNum++
    }
    currentId = node.Next
  }
  return nodeNum
}

function getBranchData (modelData, node) {
  let branchData = modelData
  if (node.fatherBranch === 'parallel') {
    branchData = branchData.States[node.fatherIds[0]].Branches[node.branchIndex]
  }
  return branchData
}

let functions = {
  deleteChoiceLineBlankNode: function () {
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo, ifsKeyMapping} = this.state
    let {id: nodeId, fatherIds, fatherBranch} = activeNode
    let node = modelData.States[nodeId]
    let serviceInfo = node.Resource ? servicesInfo[node.Resource] : null
    let prevNodeId = node.Prev
    let nextNodeId = node.Next
    let choiceNode = modelData.States[fatherIds[0]]
    if (choiceNode.id === prevNodeId || choiceNode.Prev === prevNodeId) {
      // 删除的是条件路线中的第一个
      let choices = choiceNode.Choices
      for (let i = 0; i < choices.length; i++) {
        if (choices[i].Next === nodeId) {
          choices[i].Next = nextNodeId
          if (!node.Converge) {
            modelData.States[nextNodeId].Prev = choiceNode.Prev
          }
          break
        }
      }
    } else {
      if (prevNodeId) {
        if (nextNodeId) {
          modelData.States[prevNodeId].Next = nextNodeId
          modelData.States[nextNodeId].Prev = prevNodeId
        } else {
          modelData.States[prevNodeId].Next = ''
          modelData.States[prevNodeId].End = true
        }
        modelData.States[prevNodeId].Converge = node.Converge
      } else {
        if (nextNodeId) {
          modelData.StartAt = nextNodeId
          modelData.States[nextNodeId].Prev = ''
        } else {
          modelData.StartAt = ''
        }
      }
    }
  },
  deleteParallelLineBlankNode: function () {
    let {modelData, activeNode} = this.state
    let {id: nodeId, fatherIds, branchIndex} = activeNode
    let branchData = getBranchData(modelData, activeNode)
    let node = branchData.States[nodeId]
    let prevNodeId = node.Prev
    let nextNodeId = node.Next
    // 并行节点中的一个节点
    let fatherNode = modelData.States[fatherIds[0]]
    if (fatherNode.id === prevNodeId || !prevNodeId) {
      // 删除的是并行路线中的第一个
      if (branchData.StartAt === nodeId) {
        branchData.StartAt = node.Next
      }
    } else {
      if (prevNodeId) {
        if (nextNodeId) {
          branchData.States[prevNodeId].Next = nextNodeId
          branchData.States[nextNodeId].Prev = prevNodeId
        } else {
          branchData.States[prevNodeId].Next = ''
          branchData.States[prevNodeId].End = true
        }
        branchData.States[prevNodeId].Converge = node.Converge
      } else {
        if (nextNodeId) {
          branchData.StartAt = nextNodeId
          branchData.States[nextNodeId].Prev = ''
        } else {
          branchData.StartAt = ''
        }
      }
    }
  },
  
  deleteBlankNode: function () {
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo, ifsKeyMapping} = this.state
    let {id: nodeId, fatherIds, fatherBranch} = activeNode
    let branchData = getBranchData(modelData, activeNode)
    let node = branchData.States[nodeId]
    let serviceInfo = node.Resource ? servicesInfo[node.Resource] : null
    let prevNodeId = node.Prev
    let nextNodeId = node.Next
    // 删除关系节点中的一个数据时，需要判断是否需要删除关系节点的下一个节点的关系配置
    if (fatherIds) {
      // 如果是最后一个节点
      if (node.Converge || node.End) {
        let fatherNode = modelData.States[fatherIds[0]]
        // 如果存在一下个不是结束节点的节点
        if (fatherNode.Next && fatherNode.Next !== 'm_endnode') {
          let fatherNextNode = modelData.States[fatherNode.Next]
          removeRelationship(fatherNextNode)
          this.errorFunctions.checkNode(fatherNextNode)
        }
      }
    }
    if (!fatherIds) {
      if (prevNodeId) {
        if (nextNodeId) {
          branchData.States[prevNodeId].Next = nextNodeId
          branchData.States[nextNodeId].Prev = prevNodeId
        } else {
          branchData.States[prevNodeId].Next = ''
          branchData.States[prevNodeId].End = true
        }
      } else {
        if (nextNodeId) {
          branchData.StartAt = nextNodeId
          branchData.States[nextNodeId].Prev = ''
        } else {
          branchData.StartAt = ''
        }
      }
    } else if (fatherBranch === 'choice') {
      // 条件节点中的一个节点
      this.menuFunctions.deleteChoiceLineBlankNode()
    } else if (fatherBranch === 'parallel') {
      // 并行节点中的一个节点
      this.menuFunctions.deleteParallelLineBlankNode()
    }
    if (nextNodeId && nextNodeId !== 'm_endnode') {
      // 清空下一个节点的配置关系
      let nextNode = branchData.States[nextNodeId]
      removeRelationship(nextNode)
      this.errorFunctions.checkNode(nextNode)
    }
    if (activeNode.Type === 'Choice' || activeNode.Type === 'ChoiceStart') {
      // 删除条件节点
      let branches = node.Choices
      branches.map((branchItem) => {
        let nextNodeId = branchItem.Next
        this.menuFunctions.deleteChoiceLineNode(modelData.States, nextNodeId)
      })
    } else if (activeNode.Type === 'Parallel' || activeNode.Type === 'ParallelStart') {
      // 删除并行节点
      let branches = node.Branches
      branches.map((branchItem) => {
        let nextNodeId = branchItem.StartAt
        this.menuFunctions.deleteParallelLineNode(branchItem.States, nextNodeId)
      })
    }
    delete branchData.States[nodeId]
    if (serviceInfo) {
      modelProtocolTypeMapping[serviceInfo.protocolType]--
    }
    this.errorFunctions.deleteErrorMapping(nodeId, node.Type)
    this.ifsFunctions.deleteNode(nodeId)
    if (fatherIds && fatherIds.length) {
      this.errorFunctions.checkNode(modelData.States[fatherIds[0]])
    }
    this.setState({
      modelData
    })
  },
  deleteNodeData: function () {
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo, ifsKeyMapping} = this.state
    let {id: nodeId, fatherIds} = activeNode
    let branchData = getBranchData(modelData, activeNode)
    let serviceInfo = activeNode.Resource ? servicesInfo[activeNode.Resource] : null
    let newNode = getBlankNode('task', nodeId, {
      End: activeNode.End,
      Converge: activeNode.Converge,
      Prev: activeNode.Prev,
      Next: activeNode.Next,
      fatherIds: activeNode.fatherIds,
      fatherBranch: activeNode.fatherBranch,
      branchIndex: activeNode.branchIndex
    })
    branchData.States[nodeId] = newNode
    activeNode = newNode
    if (serviceInfo) {
      modelProtocolTypeMapping[serviceInfo.protocolType]--
    }
    // 删除关系节点中的一个数据时，需要判断是否需要删除关系节点的下一个节点的关系配置
    if (fatherIds) {
      // 如果是最后一个节点
      if (newNode.Converge || newNode.End) {
        let fatherNode = modelData.States[fatherIds[0]]
        // 如果存在一下个不是结束节点的节点
        if (fatherNode.Next && fatherNode.Next !== 'm_endnode') {
          let fatherNextNode = modelData.States[fatherNode.Next]
          removeRelationship(fatherNextNode)
          this.errorFunctions.checkNode(fatherNextNode)
        }
      }
    }
    this.errorFunctions.deleteErrorMapping(nodeId, activeNode.Type)
    this.ifsFunctions.deleteNode(nodeId)
    this.errorFunctions.checkNode(newNode)
    if (fatherIds && fatherIds.length) {
      this.errorFunctions.checkNode(modelData.States[fatherIds[0]])
    }
    if (activeNode.Next && activeNode.Next !== 'm_endnode') {
      // 清空下一个节点的配置关系
      let nextNode = branchData.States[activeNode.Next]
      removeRelationship(nextNode)
      this.errorFunctions.checkNode(nextNode)
    }
    this.setState({modelData, activeNode})
  },
  deleteNode: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo} = this.state
    let {id: nodeId, fatherIds} = activeNode
    let branchData = getBranchData(modelData, activeNode)
    let hasFatherNode = fatherIds && fatherIds.length
    let unDeleted = false
    let unDeletedTip = ''
    if (hasFatherNode 
      && (activeNode.Prev && !branchData.States[activeNode.Prev].fatherIds) 
      && activeNode.Converge
    ) {
      // 条件关系节点中的唯一一个节点不可删除
      unDeleted = true
      unDeletedTip = '不可删除：关系节点中路线不能为空'
    } else if (hasFatherNode 
      && branchData.StartAt === nodeId && (activeNode.End || activeNode.Next === 'm_endnode')){
      // 并行关系节点中的唯一一个节点不可删除
      unDeleted = true
      unDeletedTip = '不可删除：关系节点中路线不能为空'
    } else if (branchData.StartAt === nodeId && activeNode.Next && branchData.States[activeNode.Next].Type === 'Choice'){
      // 如果是第一个节点，且下一个节点是关系节点，不可删除
      unDeleted = true
      unDeletedTip = '不可删除：关系节点不能作为第一个节点'
    }
    if (!activeNode.Resource) {
      // 空白节点
      if (unDeleted) {
        message.warning(unDeletedTip)
      } else {
        this.menuFunctions.deleteBlankNode()
      }
    } else {
      let tip = activeNode.Next === 'm_endnode' ? '你确定要删除该节点吗？' : '删除该节点会同时删除下一个节点中的相关数据关系，您确定要删除吗？'
      if (unDeleted) {
        // 保留空节点
        confirm({
          title: '提示',
          content: tip,
          okType: 'danger',
          cancelText: '取消',
          okText: '确认',
          onOk: () => {
            this.menuFunctions.deleteNodeData()
          },
          onCancel() {}
        })
      } else {
        confirm({
          title: '提示',
          content: tip,
          okType: 'danger',
          cancelText: '取消',
          okText: '确认',
          onOk: () => {
            this.menuFunctions.deleteBlankNode()
          },
          onCancel() {}
        })
      }
    }
  },
  deleteChoiceLineNode: function (branchDataNodes, nodeId) {
    let {servicesInfo, modelProtocolTypeMapping} = this.state
    if (nodeId && branchDataNodes[nodeId]) {
      let node = branchDataNodes[nodeId]
      let serviceInfo = node.Resource ? servicesInfo[node.Resource] : null
      let nextNodeId = !node.Converge ? node.Next : null
      this.errorFunctions.deleteErrorMapping(nodeId, node.Type)
      this.ifsFunctions.deleteNode(nodeId)
      if (serviceInfo) {
        modelProtocolTypeMapping[serviceInfo.protocolType]--
      }
      delete branchDataNodes[nodeId]
      this.menuFunctions.deleteChoiceLineNode(branchDataNodes, nextNodeId)
    }
  },
  deleteParallelLineNode: function (branchDataNodes, nodeId) {
    let {servicesInfo, modelProtocolTypeMapping} = this.state
    if (nodeId && branchDataNodes[nodeId]) {
      let node = branchDataNodes[nodeId]
      let serviceInfo = node.Resource ? servicesInfo[node.Resource] : null
      let nextNodeId = !node.End ? node.Next : null
      this.errorFunctions.deleteErrorMapping(nodeId, node.Type)
      this.ifsFunctions.deleteNode(nodeId)
      if (serviceInfo) {
        modelProtocolTypeMapping[serviceInfo.protocolType]--
      }
      delete branchDataNodes[nodeId]
      this.menuFunctions.deleteParallelLineNode(branchDataNodes, nextNodeId)
    }
  },
  deleteChoiceLine: function(){
    let {modelData, activeNode} = this.state
    let {Index: index, FatherId} = activeNode
    let fatherNode = modelData.States[FatherId]
    if (fatherNode.Choices.length <= 2) {
      message.warning('条件路线不能少于两条')
      return
    }
    this.menuFunctions.deleteChoiceLineNode( modelData.States, fatherNode.Choices[index].Next)
    fatherNode.Choices.splice(index, 1)
    this.errorFunctions.checkNode(fatherNode)
  },

  deleteParallelLine: function(){
    let {modelData, activeNode} = this.state
    let {Index: index, FatherId} = activeNode
    let fatherNode = modelData.States[FatherId]
    let branchs = fatherNode.Branches
    if (branchs.length <= 2) {
      message.warning('并行路线不能少于两条')
      return
    }
    let branchLine = branchs[index]
    this.menuFunctions.deleteParallelLineNode( branchLine.States, branchLine.StartAt)
    branchs.splice(index, 1)
    this.errorFunctions.checkNode(fatherNode)
    // 将Branches中的 branchIndex 同步修改
    for (let i = index; i < branchs.length; i++) {
      let branchItem = branchs[i]
      let currentId = branchItem.StartAt
      let nodes = branchItem.States
      while (currentId) {
        if (nodes[currentId]) {
          nodes[currentId].branchIndex--
          currentId = nodes[currentId].Next
        } else {
          currentId = undefined
        }
      }
    }
  },
  deleteChoiceNode: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo} = this.state
    let {id: nodeId, fatherIds} = activeNode
    let tip = activeNode.End || activeNode.Next === 'm_endnode' ? '你确定要删除该节点吗？' : '删除该节点会同时删除下一个节点中的相关数据关系，您确定要删除吗？'
    confirm({
      title: '提示',
      content: tip,
      okType: 'danger',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        functions.deleteBlankNode.call(this)
      },
      onCancel() {}
    })
  },
  deleteParallelNode: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelProtocolTypeMapping, servicesInfo} = this.state
    let {id: nodeId, fatherIds} = activeNode
    let tip = activeNode.End || activeNode.Next === 'm_endnode' ? '你确定要删除该节点吗？' : '删除该节点会同时删除下一个节点中的相关数据关系，您确定要删除吗？'
    confirm({
      title: '提示',
      content: tip,
      okType: 'danger',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        functions.deleteBlankNode.call(this)
      },
      onCancel() {}
    })
  },
  showDataConfig: function () {},
  doc: function () {
    let {modelData, activeNode, servicesInfo} = this.state
    let {id: nodeId, fatherIds} = activeNode
    let nodes = modelData.States
    if (activeNode.fatherBranch === 'parallel') {
      nodes = nodes[fatherIds[0]].Branches[activeNode.branchIndex].States
    }
    let serviceId = nodes[nodeId].Resource
    let serviceInfo = servicesInfo[serviceId]
    let pathname = ''
    if (activeNode.resourceType === 'iflytekService' || activeNode.resourceType === 'personalService') {
      pathname = '/ase/doc'
    } else {
      pathname = '/asc/doc'
    }
    let search = `?serviceid=${serviceId}&name=${serviceInfo.name}`
    window.open(pathname+search)
  },
  addBlankTask: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelErrorMapping} = this.state
    if (modelErrorMapping.length - (modelErrorMapping.branchLength || 0)) {
      message.warning('请完成其他节点的配置后再添加新节点')
      return
    }
    let {id: nodeId, fatherIds} = activeNode
    let branchData = getBranchData(modelData, activeNode)
    let nextNodeId = activeNode.Next
    let nodeBlank = getBlankNode('task', `m_${nodeIdNum}`, {
      branchIndex: activeNode.branchIndex
    })
    branchData = addNode(nodeBlank, branchData, nodeId)
    if (nextNodeId && nextNodeId !== 'm_endnode') {
      this.errorFunctions.checkNode(branchData.States[nextNodeId])
    }
    this.setState({
      modelData,
      nodeIdNum: nodeIdNum + 1
    })
    this.errorFunctions.checkNode(nodeBlank)
    if (nodeBlank.fatherIds) {
      let fatherNode = modelData.States[nodeBlank.fatherIds[0]]
      this.errorFunctions.checkNode(fatherNode)
    }
    // 添加关系节点中的一个数据时，需要判断是否需要删除关系节点的下一个节点的关系配置
    if (fatherIds) {
      // 如果是最后一个节点
      if (nodeBlank.Converge || nodeBlank.End) {
        let fatherNode = modelData.States[fatherIds[0]]
        // 如果存在一下个不是结束节点的节点
        if (fatherNode.Next && fatherNode.Next !== 'm_endnode') {
          let fatherNextNode = modelData.States[fatherNode.Next]
          removeRelationship(fatherNextNode)
          this.errorFunctions.checkNode(fatherNextNode)
        }
      }
    }
  },
  addBlankChoice: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelErrorMapping} = this.state
    if (modelErrorMapping.length) {
      message.warning('请完成其他节点的配置后再添加新节点')
      return
    }
    let {id: nodeId, fatherIds} = activeNode
    let choiceNodeNum = getNodeNum(modelData, 'Choice')
    let nodeChoiceBlank = getBlankNode('choice', `m_${nodeIdNum}`, {
      Comment: `条件开始${choiceNodeNum + 1}`
    })
    nodeIdNum++
    modelData = addNode(nodeChoiceBlank, modelData, nodeId)
    this.setState({
      modelData,
      nodeIdNum
    })
    this.errorFunctions.checkNode(nodeChoiceBlank)
    // 添加分支上的空白节点
    for (let i=0; i<2; i++) {
      this.menuFunctions.addChoiceLine(nodeChoiceBlank, nodeIdNum)
      nodeIdNum++
    }
  },
  addBlankParallel: function () {
    this.setState({changeState: true})
    let {modelData, activeNode, nodeIdNum, modelErrorMapping} = this.state
    if (modelErrorMapping.length) {
      message.warning('请完成其他节点的配置后再添加新节点')
      return
    }
    let {id: nodeId, fatherIds, branchIndex} = activeNode
    let parallelNodeNum = getNodeNum(modelData, 'Parallel')
    let nodeParalleBlank = getBlankNode('parallel', `m_${nodeIdNum}`, {
      Comment: `并行开始${parallelNodeNum + 1}`
    })
    nodeIdNum++
    addNode(nodeParalleBlank, modelData, nodeId)
    this.setState({
      modelData,
      nodeIdNum
    })
    this.errorFunctions.checkNode(nodeParalleBlank)
    // 添加分支上的空白节点
    for (let i=0; i<2; i++) {
      this.menuFunctions.addParallelLine(nodeParalleBlank, nodeIdNum)
      nodeIdNum++
    }
  },
  addNodeData: async function (serviceInfo, nodeId, fatherIds, fatherBranch, branchIndex) {
    this.setState({changeState: true})
    try {
      let {modelData, servicesInfo, modelProtocolTypeMapping} = this.state
      let nodes = modelData.States
      if (fatherBranch === 'parallel') {
        nodes = nodes[fatherIds[0]].Branches[branchIndex].States
      }
      let node = nodes[nodeId]
      if (servicesInfo[serviceInfo.serviceId]) {
        serviceInfo = servicesInfo[serviceInfo.serviceId]
      } else {
        await this.getServiceSchema(serviceInfo.serviceId, serviceInfo.type)
        serviceInfo = servicesInfo[serviceInfo.serviceId]
        if (!servicesInfo[serviceInfo.serviceId]) {
          return
        }
      }
      let protocolType =  serviceInfo.protocolType
      if (protocolType === ProtocolType.COMMON) {
        modelProtocolTypeMapping[ProtocolType.COMMON]++
      } else if (protocolType === ProtocolType.WS) {
        if (modelProtocolTypeMapping[ProtocolType.HTTP] > 0) {
          message.warning(`请选择接口类型为${protocolTypeOptionsObj[ProtocolType.HTTP]}的服务`)
          return
        } else {
          modelProtocolTypeMapping[ProtocolType.WS]++
        }
      } else if (protocolType === ProtocolType.HTTP) {
        if (modelProtocolTypeMapping[ProtocolType.WS] > 0) {
          message.warning(`请选择接口类型为${protocolTypeOptionsObj[ProtocolType.WS]}的服务`)
          return
        } else {
          modelProtocolTypeMapping[ProtocolType.HTTP]++
        }
      }
      node.Type = 'Task'
      node.Resource = serviceInfo.serviceId
      node.resourceType = serviceInfo.type
      node.Comment = serviceInfo.name
      this.setState({
        modelData
      })
      this.errorFunctions.checkNode(node)
      if (node.fatherIds && node.fatherIds.length) {
        this.errorFunctions.checkNode(modelData.States[node.fatherIds[0]])
      }
    } catch (e) {
      console.log('this.getServiceSchema(serviceInfo.serviceId)', e)
    }
  },
  addChoiceLine: function (choiceNode = this.state.activeNode, nodeIdNum=this.state.nodeIdNum) {
    let {modelData} = this.state
    let {id: nodeId, fatherIds} = choiceNode
    let choiceItemNode = getBlankNode('task', `m_${nodeIdNum}`, {
      Prev: choiceNode.Prev,
      Next: choiceNode.Next,
      End: choiceNode.End,
      fatherIds: [nodeId],
      fatherBranch: 'choice',
      Converge: true
    })
    choiceNode.Choices.push({
      Next: choiceItemNode.id
    })
    modelData.States[choiceItemNode.id] = choiceItemNode
    nodeIdNum++
    this.setState({modelData, nodeIdNum})
    this.errorFunctions.checkNode(choiceItemNode)
    this.errorFunctions.checkNode(choiceNode)
  },
  addParallelLine: function (parallerNode = this.state.activeNode, nodeIdNum=this.state.nodeIdNum) {
    let {modelData} = this.state
    let {id: nodeId, fatherIds} = parallerNode
    let parallelItemNode = getBlankNode('task', `m_${nodeIdNum}`, {
      fatherIds: [nodeId],
      fatherBranch: 'parallel',
      // Next: 'm_endnode',
      End: true,
      branchIndex: parallerNode.Branches.length
    })
    parallerNode.Branches.push({
      StartAt: parallelItemNode.id,
      States: {
        [parallelItemNode.id]: parallelItemNode,
      }
    })
    nodeIdNum++
    this.setState({modelData, nodeIdNum})
    this.errorFunctions.checkNode(parallelItemNode)
    this.errorFunctions.checkNode(parallerNode)
  },
  showDataSet: function () {
    let {modelData, activeNode, nodeIdNum} = this.state
    this.showDataSet(activeNode)
  }
}
function initFunction () {
  this.functions = {}
  for (let p in functions) {
    this.functions[p] = functions[p].bind(this)
  }
}
export default initFunction
