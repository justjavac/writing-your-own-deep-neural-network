import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { useModel } from "@/hooks/useModel.ts";
import { Button } from "@/components/Button.tsx";

export interface AddProps {
  title: string;
  modelName: string;
  layers: number[];
}

export default function Add({ title, layers, modelName }: AddProps) {
  const {
    model,
    network,
    loadModel,
    resetModel,
    setModel,
    loading,
    error,
    loaded,
  } = useModel(modelName, layers);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [output, setOutput] = useState<number>();

  return (
    <>
      <div class="flex flex-grow flex-col h-full border-r">
        <Graph model={model} title={title} loading={loading} />
      </div>
      <div class="flex flex-col gap-y-1 w-4/12 h-full p-4">
        <h2 class="mb-1 text-xl font-semibold">第一步：初始化网络</h2>
        <p class="my-1 text-sm font-normal">
          初始化一个神经网络模型，包含 10 个输入层，2 个隐藏层，10 个输出层。隐藏层的个数是 5。
        </p>
        <p class="my-1 text-sm font-normal">
          计算结果不能超过 9，否则会错误。
        </p>
        <h2 class="mt-4 text-xl font-semibold">第二步：加载模型</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button onClick={loadModel}>加载</Button>
        </div>
        <h2 class="mt-4 text-xl font-semibold">第三步：设置输入值</h2>
        <div class="flex gap-x-4 items-center my-1">
          <span class="text-sm font-normal">输入1</span>
          <div class="relative inline-flex flex-grow items-center cursor-pointer">
            <input
              id="default-range"
              type="range"
              value={input1}
              onInput={(e) => setInput1(parseInt((e.target as HTMLInputElement).value))}
              min={0}
              max={9}
              class="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
            />
            <span class="ml-1 text-sm font-medium text-gray-900">{input1}</span>
          </div>
        </div>
        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">输入2</span>
          <div class="relative inline-flex flex-grow items-center cursor-pointer">
            <input
              id="default-range"
              type="range"
              value={input2}
              onInput={(e) => setInput2(parseInt((e.target as HTMLInputElement).value))}
              min={0}
              max={9}
              class="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
            />
            <span class="ml-1 text-sm font-medium text-gray-900">{input2}</span>
          </div>
        </div>

        <h2 class="mt-4 text-xl font-semibold">第四步：计算</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button
            disabled={!loaded}
            onClick={() => {
              const input = Array(10).fill(0);
              input[input1] = 1;
              input[input2] = 1;
              const result = network.predict(input);
              setModel(network.exportModel());
              let max = result[0];
              let maxIndex = 0;
              for (let i = 1; i < result.length; i++) {
                if (result[i] > max) {
                  max = result[i];
                  maxIndex = i;
                }
              }
              setOutput(maxIndex);
            }}
          >
            计算
          </Button>
        </div>

        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">结果</span>
          <div class="border rounded border-gray-300 flex-grow h-8 p-1 text-gray-500">
            {output}
          </div>
        </div>
      </div>
    </>
  );
}
