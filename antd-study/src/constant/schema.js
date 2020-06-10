/**
 * 字段类型的枚举值
 * @readonly
 * @enum {string}
 */
const FieldType = {
  /** 字符串 */
  string: 'string',
  /** 整数 */
  int: 'int',
  /** 浮点数 */
  float: 'float',
  /** 布尔值 */
  boolean: 'boolean',
  /** 数组 */
  array: 'array',
  /** 对象 */
  object: 'object'
}

/**
 * 约束类型的枚举值
 * @readonly
 * @enum {string}
 */
const ConstraintType = {
  /** 枚举 */
  enum: 'enum',
  /** 长度 */
  length: 'length',
  /** 范围 */
  range: 'range',
  /** 
   * 数据大小
   * @desc 仅为交互概念存在，其对应的FieldType与ConstraintType.length同为FiledType.string
   */
  size: 'size'
}

/**
 * 协议类型的枚举值
 * @readonly
 * @enum {Number}
 */
const ProtocolType = {
  /** 0 - 非流式协议 */
  HTTP: 0,
  /** 1 - 流式协议 */
  WS: 1,
  /** 2 - 兼容非流式&非流式 */
  COMMON: 2
}

/**
 * 数据段类型的枚举值
 * @readonly
 * @enum {string}
 */
const DataType = {
  /** audio - 音频 */
  audio: 'audio',
  /** audio - 文本 */
  text: 'text',
  /** audio - 图片 */
  image: 'image',
  /** audio - 视频 */
  video: 'video'
}

/**
 * 数据段返回策略的枚举值
 * @readonly
 * @enum {string}
 */
const StrategyType ={
  /** 默认返回 */
  default: 'default',
  /** 符合条件时返回 */
  control: 'control'
}

/**
 * 字段类型与约束类型的关联关系
 */
const ConstraintTypeMap = {
  /** 当FieldType为string时，ConstraintType可选范围为enum、length */
  [FieldType.string]: [ConstraintType.enum, ConstraintType.length],
  /** 当FieldType为int时，ConstraintType可选范围为enum、range */
  [FieldType.int]: [ConstraintType.enum, ConstraintType.range],
  /** 当FieldType为float时，ConstraintType可选范围为enum、range */
  [FieldType.float]: [ConstraintType.enum, ConstraintType.range],
  /** 当FieldType为boolean时，ConstraintType可选范围为enum*/
  [FieldType.boolean]: [ConstraintType.enum],
}

/**
 * 数据类型对应的描述
 */
const DataTypeMap = {
  [DataType.audio]: '音频',
  [DataType.text]: '文本',
  [DataType.image]: '图片',
  [DataType.video]: '视频'
}

export {
  FieldType,
  ConstraintType,
  ProtocolType,
  DataType,
  StrategyType,
  ConstraintTypeMap,
  DataTypeMap
}
