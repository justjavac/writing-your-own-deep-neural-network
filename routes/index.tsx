import { Handlers, PageProps } from "$fresh/server.ts";
// @deno-types="https://esm.sh/echarts@5.4.2"
import { GraphSeriesOption } from "echarts";
import NotGate from "@/islands/NotGate.tsx";
import type { Model } from "@/dnn/model.ts";
import modle from "@/models/basic.json" assert { type: "json" };

export default function Home() {
  return null;
  // return <NotGate model={modle as Model} title="一个最小化的神经网络" />;
}
