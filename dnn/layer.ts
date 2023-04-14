import { Neuron } from "./neuron.ts";

/**
 * 层，每一层包含多个神经元
 *
 * 在神经网络中，每个神经元都可以接收来自前一层的输入，并将处理后的结果传递给下一层。
 * 一个神经网络通常包含多个层，每层中包含多个神经元。
 *
 * 神经网络的输入会被传递到第一层神经元中，然后逐层向后传递，直到输出层得到最终的输出结果。
 *
 * @param n 该层中神经元的数量
 */
export class Layer {
  /**
   * 层中的神经元
   *
   * `neurons` 保存了该层中的所有神经元。
   *
   * 对于每个神经元对象，它们的输入值通常会通过一个激活函数（例如 `sigmoid`）进行处理，从而产生输出值。
   * 每个神经元的输出值通常会被传递给下一层的神经元作为输入值，从而实现神经网络的前向传递。
   *
   * 在神经网络的训练过程中，通常需要对神经元的权重和偏置进行调整，以提高网络的性能。
   * 这个过程需要利用反向传播算法（backpropagation algorithm）来实现，通过计算误差对权重和偏置的偏导数，然后根据偏导数来调整权重和偏置。
   * 通过 `Layer` 类和 `Neuron` 类的组合，可以方便地实现这个过程。
   */
  neurons: Neuron[];

  constructor(n: number) {
    this.neurons = Array(n).fill(null).map(() => new Neuron());
  }

  /**
   * 将每个神经元的偏差更新为当前偏差加上学习率和神经元误差的乘积。
   *
   * 然后，将每个神经元的输入连接的权重更新为当前权重加上学习率、动量和神经元误差的乘积。
   *
   * 这样，网络就能够根据当前误差调整其权重和偏差，以使下一次预测更准确。
   *
   * @param learningRate 学习率
   * @param momentum 动量
   */
  update(learningRate: number, momentum: number) {
    for (const neuron of this.neurons) {
      neuron.updateBias(learningRate, momentum);
    }
  }
}
