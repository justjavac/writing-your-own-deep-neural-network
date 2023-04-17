/**
 * 权重
 */
type Weight = number;

/**
 * 连接
 *
 * @param 权重
 */
type ModelConnection = Weight[];

/**
 * 神经元
 *
 * @param 0 偏执
 * @param 1 输出
 * @param 2 连接
 */
type ModelNeuron = [
  /** 偏执 */
  number,
  /** 输出 */
  number,
  /** 连接 */
  ModelConnection,
];

/**
 * 层
 */
type ModelLayer = ModelNeuron[];

/**
 * 模型
 */
export type Model = ModelLayer[];
