import { Neuron } from "./neuron.ts";

/**
 * 连接
 *
 * 连接两个神经元。每个连接都有一个权重值，用于计算神经元的输出值。
 *
 * @param from 来源
 * @param to 目标
 */
export class Connection {
  /** 来源 */
  from: Neuron;

  /** 目标 */
  to: Neuron;

  /**
   * 权重
   *
   * 权重（weight）是指连接两个神经元之间的强度或重要性。
   * 它表示了信息从一个神经元流向另一个神经元时的影响力大小，通常是一个实数值。
   * 权重的值越大，表示信息传递的影响力越强；反之，如果权重的值越小，则信息传递的影响力越弱。
   *
   * 在神经网络中，每个连接都有一个对应的权重，用来控制信息的传递和处理。
   * 在训练神经网络时，通过调整每个连接的权重来达到优化网络性能的目的。
   *
   * 权重的调整可以通过反向传播算法等优化算法来完成。
   *
   * 在 `Connection` 类中，每个连接都有一个权重属性（weight），用于表示该连接的权重值。
   * 初始情况下，权重值通常是随机生成的，但在训练过程中会不断调整，以提高神经网络的性能。
   */
  weight = Math.random();

  /**
   * radient 是指一个错误对于网络权重的影响程度
   *
   * 在神经网络的训练过程中，需要对连接权重进行调整，以提高网络的性能。
   * 一般来说，权重的调整需要利用反向传播算法（backpropagation algorithm）来实现，而该算法涉及到计算误差（error）对权重的偏导数（partial derivative），然后根据偏导数来调整权重。
   *
   * 为了实现这个过程，需要保存每个连接的权重变化量，每次计算完某个连接的权重的偏导数之后，就可以根据偏导数的值来计算该连接的权重变化量。
   *
   * 权重变化量的计算方式可以根据不同的优化算法而不同，比如常见的梯度下降算法（gradient descent algorithm）中，权重变化量可以表示为学习率（learning rate）与权重偏导数的乘积。
   * 根据权重变化量，可以更新连接的权重值，以实现网络的训练和优化。
   */
  radient = 0;

  constructor(from: Neuron, to: Neuron) {
    this.from = from;
    this.to = to;
  }

  /**
   * @param learningRate 学习率
   * @param momentum 动量
   */
  adjustWeights(learningRate: number, momentum: number) {
    this.radient = momentum * this.radient +
      learningRate * this.to.delta * this.from.output;
    this.weight = this.weight + this.radient;
  }
}
