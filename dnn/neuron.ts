import { Connection } from "./connection.ts";

/**
 * 神经元
 *
 * 在神经网络中，Neuron（神经元）是神经网络的基本单元，它模拟了生物神经元的基本功能。
 * 神经元接受多个输入信号，并对这些信号进行加权求和，然后通过一个激活函数（如 `sigmoid`）对结果进行非线性变换，从而产生一个输出值。
 * 神经元的输出值可以作为下一层神经元的输入值，从而构成了神经网络的前向传播过程。
 *
 * 在神经元中，输入信号通常通过输入连接（Connection）传入，每个连接都有一个权重值（Weight），用于控制该输入信号在神经元中的贡献程度。
 * 同时，神经元还有一个可学习的偏置（bias）参数，通常被添加到输入信号的加权和上，并通过激活函数进行转换。
 * 神经网络训练过程中，神经元的权重和偏置参数会被不断地调整和优化，以适应所处理的任务和数据。
 *
 * 在神经网络的训练过程中，神经元的误差（error）也是非常重要的一个参数，它表示神经元的输出值与期望输出值之间的差异或偏差。
 * 误差是反向传播算法的核心之一，用于调整权重和优化网络。
 * 神经元的输出值和误差值也是神经网络的重要指标，直接影响着网络的性能和效果。
 *
 * 因此，神经元是神经网络中非常重要的基本单元，它通过对输入信号进行加权求和和非线性变换，实现了神经网络对复杂模式和特征的学习和表示。
 */
export class Neuron {
  inputConnections: Connection[] = [];
  outputConnections: Connection[] = [];

  /**
   * 神经元的偏置
   *
   * `bias` 是一个可学习的参数，一般用于添加到输入信号的加权和上，并通过激活函数进行转换。
   * 通常情况下，神经网络训练过程中，神经元的偏置初始化为随机值，然后根据实际训练结果来不断调整优化。
   *
   * 神经元的偏置可以理解为神经元的“容错性”或“灵敏度调节器”，在训练过程中通过这个参数的调整，
   * 可以使神经元学习到更合适的参数值，从而提高模型的精度和鲁棒性。
   */
  bias = 0;

  /**
   * 用于存储权值的变化百分比
   *
   * 在训练神经网络时，每次通过前向传播计算输出值后，需要根据实际输出值和期望输出值之间的差异（即误差）来计算每个神经元的 `delta` 值。
   * 然后，通过反向传播算法，将这些 `delta` 值传播回前一层的神经元，用于更新其输入连接的权重。
   * 因此，`delta` 值可以看作是一个指示权值更新方向和幅度的信号，它越大，则表示权值需要更大的更新。
   *
   * 通过反复迭代调整权值和 `delta` 值，神经网络可以逐渐优化其性能，实现更好的学习和预测效果。
   */
  delta = 0;

  /**
   * 神经元输出值
   *
   * 每个神经元都有一个输出值，它表示该神经元的激活程度或者说激活状态。
   * 神经元的输出值是根据其输入连接的加权和和偏置值，经过激活函数（如 `sigmoid`）计算得到的。
   * 激活函数的作用是对输入信号进行非线性变换，使得神经元可以对复杂的模式和特征进行学习和表示。
   * 因此，神经元的输出值可以看作是对输入信号的抽象和编码结果，它随着网络的训练和学习而不断调整和优化，以适应所处理的任务和数据。
   *
   * 在神经网络中，每个神经元的输出值也是下一层神经元的输入值，用于继续进行前向传播计算。
   * 同时，在反向传播算法中，误差也是通过神经元的输出值来传播和计算的，以调整权重和优化网络。
   * 因此，神经元的输出值是神经网络中非常重要的一个参数，直接影响着神经网络的性能和效果。
   */
  output = 0;

  /**
   * 神经元的误差
   *
   * 表示神经元的输出值与期望输出值之间的差异或者偏差。
   * 在神经网络的训练过程中，误差是非常重要的一个参数，因为它是反向传播算法的核心之一，用于调整权重和优化网络。
   *
   * 误差可以通过以下公式计算得到：
   *
   * ```
   * 误差 = 期望输出值 - 实际输出值
   * ```
   *
   * 其中，期望输出值即在训练数据中给定的正确值。
   * 误差值越小，则表示神经元的输出值越接近期望输出值，反之则表示误差越大，需要通过反向传播算法进行调整和优化。
   *
   * 在反向传播算法中，误差被用来计算 `delta` 值，以及传播和调整权重。
   * 每个神经元的误差可以通过后一层神经元的 `delta` 值和权重来计算，从而不断向前传播和调整。
   * 因此，误差也是神经网络中非常重要的一个参数，直接影响着网络的性能和训练效果。
   */
  error = 0;

  /**
   * 生成介于 `[min, max]` 之间的随机 bias
   */
  generateRandomBias() {
    const min = -1;
    const max = 1;
    this.bias = Math.random() * (max - min) + min;
  }

  addInputConnection(connection: Connection) {
    this.inputConnections.push(connection);
  }

  addOutputConnection(connection: Connection) {
    this.outputConnections.push(connection);
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
  updateBias(learningRate: number, momentum: number) {
    this.bias += learningRate * this.delta;

    for (const connection of this.inputConnections) {
      connection.adjustWeights(learningRate, momentum);
    }
  }
}
