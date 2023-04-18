import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { useModel } from "@/hooks/useModel.ts";
import { Button } from "@/components/Button.tsx";

export interface OddProps {
  title: string;
  modelName: string;
  layers: number[];
}

export default function Odd({ title, layers, modelName }: OddProps) {
  const { model, network, loadModel, setModel, loading, loaded } = useModel(modelName, layers);
  const [input1, setInput1] = useState(0);
  const [output1, setOutput1] = useState("");

  return (
    <>
      <div class="flex flex-grow flex-col h-full border-r">
        <Graph model={model} title={title} loading={loading} />
      </div>
      <div class="flex flex-col gap-y-1 w-4/12 h-full p-4">
        <h2 class="mb-1 text-xl font-semibold">第一步：初始化网络</h2>
        <p class="my-1 text-sm font-normal">
          初始化一个神经网络模型，包含 1 个输入层，1 个隐藏层，1 个输出层。隐藏层的个数是 5。
        </p>
        <h2 class="mt-4 text-xl font-semibold">第二步：加载模型</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button onClick={loadModel}>加载</Button>
        </div>
        <h2 class="mt-4 text-xl font-semibold">第三步：设置输入值</h2>
        <div class="flex gap-x-4 items-center my-1">
          <label class="text-sm font-normal" for="input1">输入</label>
          <input
            id="input1"
            type="number"
            min={0}
            max={1023}
            onFocus={(e) => (e.target as HTMLInputElement).select()}
            class="border rounded-sm border-gray-300 bg-white flex-grow h-8 p-1 text-gray-500 outline-none focus:text-gray-800 focus:border-gray-500 hover:border-gray-500 transition-colors"
            value={input1}
            onInput={(e) => setInput1(parseInt((e.target as HTMLInputElement).value))}
          />
          <Button
            onClick={() => {
              setInput1(Math.round(Math.random() * 1023));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 inline mr-1"
            >
              <path d="M3 2v6h6"></path>
              <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
              <path d="M21 22v-6h-6"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
            </svg>
            随机数
          </Button>
        </div>

        <h2 class="mt-4 text-xl font-semibold">第四步：计算</h2>
        <div class="flex gap-x-4 items-center my-1">
          <Button
            disabled={!loaded}
            onClick={() => {
              const input = input1.toString(2).padStart(10, "0").split("").map(Number);
              const result = network.predict(input);
              setModel(network.exportModel());
              setOutput1(Math.round(result[0]) ? "奇数" : "偶数");
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
