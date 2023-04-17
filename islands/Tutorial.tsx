import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { useToggle } from "@/hooks/useToggle.ts";
import { Button } from "@/components/Button.tsx";
import type { Model } from "@/dnn/model.ts";

export default function Tutorial() {
  const [input1, toggleInput1] = useToggle(0);
  const [output1, setOutput1] = useState("");

  return (
    <div class="flex flex-col px-4 pb-10">
      <div class="flex">
        <div class="flex flex-col gap-y-1 w-8/12 h-full border-r py-4">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
            一步步开发自己的深度神经网络
          </h1>
          <p class="my-1">
            在生物学中，神经元使用一种称为突触的特殊连接与其他细胞进行通信，从而实现大脑的思考。而人工神经网络则使用代码模拟了这种结构。
          </p>
          <p class="my-1">
            神经网络由 1 个输入层、n 个隐藏层、1 个输出层构成。右侧展示了一个神经网络。
          </p>
          <p class="my-1">
            每个神经元(Neuron)有一个偏置 <code>bias</code>。例如右图中的 <code>b1</code>、<code>b2</code>{" "}
            等等。每个神经元之间的连接(Connection)都有一个权重 <code>weight</code>。例如右图中的{" "}
            <code>w1</code>、<code>w2</code>等等。
          </p>
          <p class="my-1">
            计算神经元的输出过程为：所有输入神经元的加权和 + 当前神经元的偏置。例如 <code>b2</code> 神经元的输出为：
          </p>
          <p class="my-1">
            <code>x1 = input1 * w1 + input2 * w2 + b2</code>
          </p>
          <p class="my-1">
            由于所有的输入和输出都是 0-1 的数值，因此我们还需要一个函数把输出值映射到 0-1 的范围。我们选择一个通用的
            {" "}
            <code>sigmoid</code> 函数：
          </p>
          <p class="my-1">
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
          <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">
            手动构建一个神经网络
          </h2>
          <p class="my-1">
            我们了解了神经网络的原理后，尝试手动构建一个最简单的神经网络：取反。
          </p>
          <p class="my-1">
            只设置 1 个输入，1 个输出，没有隐藏层。当输入为 1 的时候，输出 0；当输入 0 的时候，输出 1。
          </p>
          <p class="my-1">
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
          <p class="my-1">
            这个网络足够简单，输出的计算方式是：
          </p>
          <p class="my-1">
            <code>f(x) = x * w + b</code>
          </p>
          <p class="my-1">
            把 0 和 1 带入到方程：
          </p>
          <p class="my-1">
            <ul>
              <li>
                <code>0 = 1 * w + b</code>
              </li>
              <li>
                <code>1 = 0 * w + b</code>
              </li>
            </ul>
          </p>
          <p class="my-1">
            解方程：w = -1，b = 1。
          </p>
          <p class="my-1">
            于是我们得到了最终的神经网络，如右图所示：
          </p>
        </div>
        <div class="flex flex-grow flex-col h-full">
          <Graph
            model={[[[0, "输入", []]], [[1, "输出", [-1]]]] as unknown as Model}
          />
        </div>
      </div>
    </div>
  );
}
