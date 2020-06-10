
import { DataType, ProtocolType, DataTypeMap } from './schema'

const dataTypeOptions = [
  { value: DataType.audio, label: DataTypeMap[DataType.audio] },
  { value: DataType.text, label: DataTypeMap[DataType.text] },
  { value: DataType.image, label: DataTypeMap[DataType.image] },
  { value: DataType.video, label: DataTypeMap[DataType.video] }
]

const protocolTypeOptions = [
  { value: ProtocolType.HTTP, label: '非流式（HTTP1.1）' },
  { value: ProtocolType.WS, label: '流式（WebSocket）' }
]

export {
  dataTypeOptions,
  protocolTypeOptions
}