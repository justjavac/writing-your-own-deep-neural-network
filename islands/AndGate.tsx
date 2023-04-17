import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { useToggle } from "@/hooks/useToggle.ts";
import { useModel } from "@/hooks/useModel.ts";
import { Button } from "@/components/Button.tsx";

export interface AndGateProps {
  title: string;
  modelName: string;
  layers: number[];
}

export default function AndGate({ title, layers, modelName }: AndGateProps) {
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

  const [input1, toggleInput1] = useToggle(0);
  const [input2, toggleInput2] = useToggle(0);
  const [output1, setOutput1] = useState("");

  return (
    <>
      <div class="flex flex-grow flex-col h-full border-r">
        <Graph model={model} title={title} loading={loading} />
      </div>
      <div class="flex flex-col gap-y-1 w-4/12 h-full p-4">
        <h2 class="mb-1 text-xl font-semibold">第一步：初始化网络</h2>
        <p class="my-1 text-sm font-normal">
          初始化一个神经网络模型，包含 2 个输入层，2 个隐藏层，1 个输出层。隐藏层的个数是 5。
        </p>
        <h2 class="mt-4 text-xl font-semibold">第二步：加载模型</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button onClick={loadModel}>加载</Button>
        </div>
        <h2 class="mt-4 text-xl font-semibold">第三步：设置输入值</h2>
        <div class="flex gap-x-4 items-center my-1">
          <span class="text-sm font-normal">输入1</span>
          <label
            class="relative inline-flex items-center cursor-pointer"
            onClick={toggleInput1}
          >
            <div
              class={`w-11 h-6 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full ${
                input1 ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                class={`absolute top-[2px] left-[2px] bg-white border rounded-full h-5 w-5 ${
                  input1 ? "translate-x-full border-white" : "transition-all border-gray-300"
                }`}
              >
              </div>
            </div>
            <span class="ml-1 text-sm font-medium text-gray-900">
              {input1 ? "真" : "假"}
            </span>
          </label>
        </div>
        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">输入2</span>
          <label
            class="relative inline-flex items-center cursor-pointer"
            onClick={toggleInput2}
          >
            <div
              class={`w-11 h-6 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full ${
                input2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                class={`absolute top-[2px] left-[2px] bg-white border rounded-full h-5 w-5 ${
                  input2 ? "translate-x-full border-white" : "transition-all border-gray-300"
                }`}
              >
              </div>
            </div>
            <span class="ml-1 text-sm font-medium text-gray-900">
              {input2 ? "真" : "假"}
            </span>
          </label>
        </div>

        <h2 class="mt-4 text-xl font-semibold">第四步：计算</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button
            disabled={!loaded}
            onClick={() => {
              const result = network.predict([input1, input2]);
              setModel(network.exportModel());
              setOutput1(Math.round(result[0]) ? "真" : "假");
            }}
          >
            计算
          </Button>
        </div>

        <div class="mt-4 flex gap-x-4 items-center">
          <span class="text-sm font-normal">结果</span>
          <div class="border rounded border-gray-300 flex-grow h-8 p-1 text-gray-500">
            {output1}
          </div>
        </div>
      </div>
    </>
  );
}
