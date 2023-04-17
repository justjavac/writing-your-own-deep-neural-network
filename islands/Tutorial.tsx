import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { useToggle } from "@/hooks/useToggle.ts";
import { Button } from "@/components/Button.tsx";
import type { Model } from "@/dnn/model.ts";
import { useModel } from "@/hooks/useModel.ts";
import { Network } from "../dnn/network.ts";

export default function Tutorial() {
  const [output1, setOutput1] = useState("");
  const { model, network, setModel } = useModel("", [2, 3, 1]);

  return (
    <div class="flex flex-col px-4 pb-10 markdown-body">
      <div class="flex">
        <div class="flex flex-col gap-y-1 w-8/12 h-full border-r py-4">
          <p>
            在生物学中，神经元使用一种称为突触的特殊连接与其他细胞进行通信，从而实现大脑的思考。而人工神经网络则使用代码模拟了这种结构。
          </p>
          <p>
            神经网络由 1 个输入层、n 个隐藏层、1 个输出层构成。右侧展示了一个神经网络。
          </p>
          <p>
            每个神经元(Neuron)有一个偏置 <code>bias</code>。例如右图中的 <code>b1</code>、<code>b2</code>{" "}
            等等。每个神经元之间的连接(Connection)都有一个权重 <code>weight</code>。例如右图中的{" "}
            <code>w1</code>、<code>w2</code>等等。
          </p>
          <p>
            计算神经元的输出过程为：所有输入神经元的加权和 + 当前神经元的偏置。例如 <code>b2</code> 神经元的输出为：
          </p>
          <p>
            <code>x1 = input1 * w1 + input2 * w2 + b2</code>
          </p>
          <p>
            由于所有的输入和输出都是 0-1 的数值，因此我们还需要一个函数把输出值映射到 0-1 的范围。我们选择一个通用的
            {" "}
            <code>sigmoid</code> 函数：
          </p>
          <p>
            <code>f(n) = 1 / (1 + e^(-n))</code>
          </p>
        </div>
        <div class="flex flex-grow flex-col h-full border-b">
          <Graph
            model={[[[0, "输入1", []], [0, "输入2", []]], [["b1", "x1", ["w1", "w2"]], ["b2", "x2", ["w3", "w4"]]], [[
              "b3",
              "输出1",
              ["w5", "w6"],
            ]]] as unknown as Model}
          />
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col gap-y-1 w-8/12 h-full border-r py-4">
          <h3>
            手动构建一个神经网络
          </h3>
          <p>
            我们了解了神经网络的原理后，尝试手动构建一个最简单的神经网络：取反。
          </p>
          <p>
            只设置 1 个输入，1 个输出，没有隐藏层。当输入为 1 的时候，输出 0；当输入 0 的时候，输出 1。
          </p>
          <p>
            现在这个网络是这样的，如右图所示：
          </p>
        </div>
        <div class="flex flex-grow flex-col h-full border-b">
          <Graph
            model={[[[0, "x", []]], [["b", "输出", ["w"]]]] as unknown as Model}
          />
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col gap-y-1 w-8/12 h-full border-r py-4">
          <p>
            这个网络足够简单，输出的计算方式是：
          </p>
          <p>
            <code>f(x) = x * w + b</code>
          </p>
          <p>
            把 0 和 1 带入到方程：
          </p>
          <p>
            <code>0 = 1 * w + b</code>
            <br />
            <code>1 = 0 * w + b</code>
          </p>
          <p>
            解方程：w = -1，b = 1。
          </p>
          <p>
            于是我们得到了最终的神经网络，如右图所示：
          </p>
        </div>
        <div class="flex flex-grow flex-col h-full border-b">
          <Graph
            model={[[[0, "输入", []]], [[1, "输出", [-1]]]] as unknown as Model}
          />
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col gap-y-1 w-8/12 h-full border-r py-4">
          <h3>
            训练一个神经网络
          </h3>
          <p>
            现实中的神经网络通常包括几万甚至上亿个参数，如果手动计算这些参数肯定是不可能的。因此我们需要让网络自主学习。
          </p>
          <p>
            现在我们构建一个网络来执行这个任务：判断是否相等。这个网络包含 2 个输入，1 个输出，1 个隐藏层，其中隐藏层有
            3 个神经元。
          </p>
          <p>
            我们执行 <code>const network = new Network([2, 3, 1])</code> 初始化这个网络。
          </p>
          <p>
            点击这个按钮{" "}
            <Button
              onClick={() => {
                const network = new Network([2, 3, 1]);
                setModel(network.exportModel());
              }}
            >
              初始化
            </Button>{" "}
            网络的神经元会会设置为随机值。
          </p>
          <p>
            接下来我们准备一组训练数据，对其训练 1000 次。
          </p>
          <p class="highlight">
            <pre class="highlight"><code>{`const trainingData = [
  { input: [0, 0], output: [1] },
  { input: [1, 1], output: [1] },
  { input: [0, 1], output: [0] },
  { input: [1, 0], output: [0] },
];

for (let i = 0; i < 1000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}`}
</code></pre>
          </p>
          <p>
            每点一次{" "}
            <Button
              onClick={() => {
                const trainingData = [
                  { input: [0, 0], output: [1] },
                  { input: [1, 1], output: [1] },
                  { input: [0, 1], output: [0] },
                  { input: [1, 0], output: [0] },
                ];

                for (let i = 0; i < 1000; i++) {
                  const index = Math.floor(Math.random() * trainingData.length);
                  const { input, output } = trainingData[index];
                  network.train(input, output);
                }

                const result = trainingData
                  .map(({ input }) => input)
                  .map((x) => [...x, network.predict(x)[0]])
                  .map((x) => `${x[0]},${x[1]} --> ${x[2]}`)
                  .join("\n");

                setOutput1(result);
                setModel(network.exportModel());
              }}
            >
              训练
            </Button>，我们都会对网络训练 1000 次，并输出测试结果。
          </p>
          <p>
            当点击 10 次后，<code>0,0</code> 和 <code>1,1</code> 的输出接近 1，而 <code>0,1</code> 和 <code>1,0</code>
            {" "}
            的输出接近 0。说明我们的网络经过一万次训练后，已经可以成功预测两个比特位是否相等。
          </p>
        </div>
        <div class="flex flex-grow flex-col h-full border-b">
          <Graph model={model} />
          <pre class="w-full h-40">{output1}</pre>
        </div>
      </div>
    </div>
  );
}
