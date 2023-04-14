import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { Network, type Model } from "@/dnn/mod.ts";

export interface AddProps {
  title: string;
  model: Model;
}

export default function Add(props: AddProps) {
  const [model, setModel] = useState(props.model);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [output, setOutput] = useState<number>();

  const network = Network.fromModel(model);

  return (
    <>
      <div class="flex flex-grow flex-col h-full border-r">
        <Graph model={model} />
      </div>
      <div class="flex flex-col gap-y-1 w-4/12 h-full p-4">
        <h2 class="mb-4 text-xl font-semibold">
          {props.title}
          <small class="ml-1 text-sm font-normal text-gray-500">超出10以后结果就不对了</small>
          </h2>
        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">输入1</span>
          <div class="relative inline-flex flex-grow items-center cursor-pointer">
            <input
              id="default-range"
              type="range"
              value={input1}
              onInput={(e) =>
                setInput1(parseInt((e.target as HTMLInputElement).value))
              }
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
              onInput={(e) =>
                setInput2(parseInt((e.target as HTMLInputElement).value))
              }
              min={0}
              max={9}
              class="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
            />
            <span class="ml-1 text-sm font-medium text-gray-900">{input2}</span>
          </div>
        </div>

        <div class="flex gap-x-4 items-center my-4">
          <button
            type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none rounded px-4 py-1 text-center"
            onClick={() => {
              const input = Array(10).fill(0);
              input[input1] = 1;
              input[input2] = 1;
              const result = network.predict(input);
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
          </button>
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
