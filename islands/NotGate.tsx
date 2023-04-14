import { useState } from "preact/hooks";
import { Graph } from "@/components/Graph.tsx";
import { Network, type Model } from "@/dnn/mod.ts";
import { useToggle } from "@/hooks/useToggle.ts";

export interface NotGateProps {
  title: string;
  model: Model;
}

export default function NotGate(props: NotGateProps) {
  const [model, setModel] = useState(props.model);
  const [input1, toggleInput1] = useToggle(0);
  const [output1, setOutput1] = useState("");

  const network = Network.fromModel(model);

  return (
    <>
      <div class="flex flex-grow flex-col h-full border-r">
        <Graph model={model} />
      </div>
      <div class="flex flex-col gap-y-1 w-4/12 h-full p-4">
        <h2 class="mb-4 text-xl font-semibold">{props.title}</h2>
        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">输入</span>
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
                  input1
                    ? "translate-x-full border-white"
                    : "transition-all border-gray-300"
                }`}
              ></div>
            </div>
            <span class="ml-1 text-sm font-medium text-gray-900">
              {input1 ? "真" : "假"}
            </span>
          </label>
        </div>

        <div class="flex gap-x-4 items-center my-4">
          <button
            type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none rounded px-4 py-1 text-center"
            onClick={() =>
              setOutput1(
                Math.round(network.predict([input1])[0]) ? "真" : "假"
              )
            }
          >
            计算
          </button>
        </div>

        <div class="flex gap-x-4 items-center">
          <span class="text-sm font-normal">结果</span>
          <div class="border rounded border-gray-300 flex-grow h-8 p-1 text-gray-500">
            {output1}
          </div>
        </div>
      </div>
    </>
  );
}
