import { Connection } from "./connection.ts";
import { Layer } from "./layer.ts";
import { Model } from "./model.ts";
import { sigmoid } from "./sigmoid.ts";

/**
 * 神经网络, 由多个层组成
 *
 * `Network` 构造函数接受一个数字数组 `arr`，表示每个层中神经元的数量。
 * `arr` 的第一个元素表示输入神经元的数量，最后一个元素表示输出神经元的数量。
 * 对于 `arr` 中的每个元素，都会创建一个包含相应数量神经元的新的 `Layer` 对象。
 *
 * 如果层不是输入层（即其索引不为 `0`），则为该层中的每个神经元赋予一个随机生成的偏置值。
 *
 * 在创建层后，会调用 `connectLayers` 方法来设置相邻层神经元之间的连接。
 *
 * 在训练期间，神经网络接受输入数据，通过各个层进行前向传递，计算输出与期望输出之间的误差，然后使用反向传播算法更新神经元的权重和偏置以最小化误差。
 *
 * 总的来说，`Network` 类提供了一种方便的方式来创建和训练一个具有可定制学习率和动量参数的神经网络。
 *
 * @param layers 每个层中神经元的数量。第一个元素表示输入神经元的数量，最后一个元素表示输出神经元的数量
 * @param learningRate 学习率，用于在训练过程中调整权重
 */
export class Network {
  layers: Layer[];

  /**
   * 学习率
   *
   * learningRate（学习率）是神经网络中一个重要的超参数，用于调整神经网络在训练期间对误差的响应程度。具体来说，它控制着神经网络在每次迭代中对权重进行调整的步长大小，以使神经网络在训练数据上达到更好的拟合效果。
   *
   * 在训练神经网络时，它会使用前向传播算法来计算神经元的输出，然后根据实际输出和期望输出之间的误差来调整神经元的权重。学习率决定了每个权重更新所需要的步长大小，过小的学习率会导致收敛速度缓慢，而过大的学习率可能会导致神经网络无法收敛或收敛到次优解。
   *
   * 因此，选择合适的学习率对神经网络的训练非常重要。通常，需要通过交叉验证等技术来确定最佳的学习率。对于不同的问题和数据集，可能需要不同的学习率。常用的学习率值通常在 0.1 到 0.0001 之间，但也可以更高或更低，具体取决于问题的复杂性和数据的特征。
   */
  learningRate: number;

  /**
   * 动量
   *
   * momentum（动量）是神经网络中一个常用的优化技巧，用于加速梯度下降算法的收敛速度。
   * 具体来说，它利用过去一段时间的梯度信息来修正当前的梯度下降方向，从而减少梯度下降算法的震荡和抖动，使其更加稳定和快速地收敛到全局最优解。
   *
   * 在神经网络中，通常使用反向传播算法来计算每个权重对误差的贡献，然后根据这些贡献来更新权重。
   * 而在梯度下降算法中，每次更新权重的方向和大小都是基于当前的梯度计算的。
   * 然而，在实际应用中，梯度往往存在很多噪声和波动，这会导致梯度下降算法收敛的速度很慢或者收敛到次优解。
   *
   * 为了解决这个问题，可以引入动量的概念。
   * 具体来说，动量可以看作是梯度下降算法的一个历史记录，它保存了过去一段时间的梯度信息，并根据这些信息来调整当前的梯度下降方向和大小。
   * 通常，动量的取值范围在 0 到 1 之间，它越大则表示过去的梯度信息对当前梯度的影响越大，从而使更新方向更加平稳和一致。
   *
   * 具体来说，动量算法通过以下公式来更新权重：
   *
   * ```
   * v(t) = momentum * v(t-1) + learningRate * gradient
   * weight = weight + v(t)
   * ```
   *
   * - `v(t)` 表示当前时间步的动量值
   * - `momentum` 表示动量的系数
   * - `v(t-1)` 表示上一个时间步的动量值
   * - `learningRate` 表示学习率
   * - `gradient` 表示当前时间步的梯度信息
   *
   * 在每次迭代中，根据动量和当前梯度信息来计算更新方向和大小，从而更新权重。
   *
   * 通过引入动量，可以加速梯度下降算法的收敛速度，并且减少震荡和抖动，从而使神经网络更加稳定和快速地收敛到全局最优解。
   * 在实际应用中，动量算法通常是梯度下降算法的一个重要组成部分，它可以提高神经网络的训练效果和性能。
   */
  momentum: number;

  constructor(layers: number[], learningRate = 0.3, momentum = 0.1) {
    this.learningRate = learningRate;
    this.momentum = momentum;

    this.layers = layers.map((n) => new Layer(n));

    // 对于除了输入层之外的每个层，遍历该层中的神经元，设置随机 bias。
    this.layers.slice(1).forEach((layer) => {
      layer.neurons.forEach((neuron) => {
        neuron.generateRandomBias();
      });
    });

    this.connectLayers();
  }

  /**
   * 从模型字符串中恢复神经网络
   *
   * @param model 模型
   * @returns
   */
  static fromModel(model: Model): Network {
    const network = new Network(model.map((x) => x.length));
    network.layers.forEach((layer, i) => {
      layer.neurons.forEach((neuron, j) => {
        const modelNeuron = model[i][j];
        neuron.bias = modelNeuron[0];
        neuron.output = modelNeuron[1];
        neuron.inputConnections.forEach((conn, k) => {
          conn.weight = modelNeuron[2][k];
        });
      });
    });
    return network;
  }

  /**
   * 连接神经网络的不同层，并且建立层之间的连接关系，从而使神经网络可以进行正向传播和反向传播的计算。
   *
   * 该方法采用了双重循环的方式，遍历了每个层之间的所有神经元，并且为每个神经元之间建立连接。
   *
   * 通过以上的连接操作，神经网络就可以将输入信号传递到每个神经元，经过多次迭代之后，输出层神经元将会产生最终的输出结果。
   * 同时，连接操作也使得反向传播算法可以有效地计算权重和偏差的梯度，并且利用这些梯度来更新神经网络的参数，从而提高神经网络的性能和准确率。
   *
   * 需要注意的是，神经网络的连接方式和结构是非常重要的，不同的连接方式和结构可能会对神经网络的性能和训练效果产生重要的影响。
   * 因此，在设计和构建神经网络时，需要根据具体的应用场景和需求来选择最优的连接方式和结构，以达到最佳的性能和效果。
   */
  connectLayers() {
    for (let i = 1; i < this.layers.length; i++) {
      const prevLayer = this.layers[i - 1];
      const currLayer = this.layers[i];
      for (const prevNeuron of prevLayer.neurons) {
        for (const currNeuron of currLayer.neurons) {
          const connection = new Connection(prevNeuron, currNeuron);
          prevNeuron.addOutputConnection(connection);
          currNeuron.addInputConnection(connection);
        }
      }
    }
  }

  /**
   * 对神经网络进行训练，通过不断地调整神经网络的参数和权重，来使神经网络能够更好地适应输入和输出之间的关系，并且提高神经网络的准确率和性能。
   *
   * 神经网络的训练是一个迭代的过程，通常需要对训练数据进行多次迭代，直到神经网络的输出结果稳定在一个可接受的范围内。
   * 同时，在训练过程中，还需要调整学习率、动量等参数，以控制神经网络的训练速度和稳定性，从而避免过拟合和欠拟合等问题。
   */
  train(input: number[], output: number[]) {
    this.setInput(input);
    this.forward();
    this.backward(output);
    this.update();
  }

  /**
   * @param input 输入向量
   */
  setInput(input: number[]) {
    this.layers[0].neurons.forEach((n, i) => {
      n.output = input[i];
    });
  }

  /**
   * 在训练之后对新的数据进行预测。
   * @param input 输入向量
   * @returns 输出向量
   */
  predict(input: number[]) {
    // 1. 将输入数据的值分配给输入层的每个神经元的输出值。
    this.setInput(input);
    // 2.
    return this.forward();
  }

  /**
   * 前向计算，用于将输入数据从输入层传递到输出层并计算出输出结果。
   *
   * 由于 `forward` 方法实现了神经网络的前向计算过程，因此在使用神经网络进行预测或测试时，通常会使用 `predict` 方法来调用 `forward` 方法。
   */
  forward() {
    // 2. 对于除了输入层之外的每个层，遍历该层中的神经元，并计算该神经元的输出值。
    this.layers.slice(1).forEach((layer) => {
      layer.neurons.forEach((neuron) => {
        const bias = neuron.bias;

        // 2.1 计算每个神经元输入权重的加权和。
        const connectionsValue = neuron
          .inputConnections.reduce((prev, conn) => {
            return prev + conn.weight * conn.from.output;
          }, 0);

        // 2.2 将加权和添加偏置项（即 `bias`），以产生神经元的净输入值。
        const netInput = bias + connectionsValue;

        // 2.3 将净输入值作为参数传递给激活函数（如 `sigmoid` 函数），来计算神经元的输出值，并将其存储在神经元的 `output` 属性中。
        neuron.output = sigmoid(netInput);
      });
    });

    // 3. 返回输出层中每个神经元的输出值作为输出向量或矩阵。
    return this.layers.at(-1)!.neurons.map((n) => n.output);
  }

  /**
   * 反向传播算法，用于计算每个神经元的误差和梯度。
   */
  backward(target: number[]) {
    // 1. 从输出层开始，计算每个神经元的误差和梯度，然后向前逐层计算，直到达到输入层
    for (let layer = this.layers.length - 1; layer >= 0; layer--) {
      const currentLayer = this.layers[layer];

      for (let neuron = 0; neuron < currentLayer.neurons.length; neuron++) {
        const currentNeuron = currentLayer.neurons[neuron];
        const output = currentNeuron.output;

        let error = 0;
        if (layer === this.layers.length - 1) {
          // 1.1 如果该神经元位于输出层，则误差是期望输出和实际输出之间的差异
          error = target[neuron] - output;
        } else {
          // 1.2 否则误差是该神经元输出连接到下一层的所有神经元的误差和，加权求和
          for (let k = 0; k < currentNeuron.outputConnections.length; k++) {
            const currentConnection = currentNeuron.outputConnections[k];
            error += currentConnection.to.delta * currentConnection.weight;
          }
        }

        currentNeuron.error = error;
        currentNeuron.delta = error * output * (1 - output);
      }
    }
  }

  /**
   * 调整权重, 以便在反向传播后更新神经网络中的权重和偏置，以提高网络的准确性。
   */
  update() {
    for (const layer of this.layers) {
      layer.update(this.learningRate, this.momentum);
    }
  }

  exportModel(): Model {
    return this.layers.map((layer) => {
      return layer.neurons.map((neuron) => {
        return [
          neuron.bias,
          neuron.output,
          neuron.inputConnections.map((conn) => {
            return conn.weight;
          }),
        ];
      });
    });
  }
}
