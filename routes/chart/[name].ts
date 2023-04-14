import { HandlerContext } from "$fresh/server.ts";
// @deno-types="https://esm.sh/echarts@5.4.2"
import { ComposeOption, GraphSeriesOption, init, TooltipComponentOption } from "echarts";
import type { Model } from "@/dnn/model.ts";
import basic from "@/models/basic.json" assert { type: "json" };
import and from "@/models/and_gate.json" assert { type: "json" };
import or from "@/models/or_gate.json" assert { type: "json" };
import not from "@/models/not_gate.json" assert { type: "json" };
import add from "@/models/add.json" assert { type: "json" };

type ECOption = ComposeOption<GraphSeriesOption | TooltipComponentOption>;

export const handler = (_req: Request, ctx: HandlerContext): Response => {
  const { name } = ctx.params;
  const model = getModel(name) as Model;

  const chart = init(undefined!, "light", {
    renderer: "svg",
    ssr: true,
    width: 800,
    height: 500,
  });

  const nodes: GraphSeriesOption["nodes"] = [];
  const links: GraphSeriesOption["links"] = [];

  // 初始化 nodes
  model.forEach((layer, i) => {
    layer.forEach((neuron, j) => {
      nodes.push({
        name: `${i}-${j}`,
        x: (800 / model.length) * i,
        y: (500 / (layer.length + 1)) * (j + 1),
        value: neuron[0],
      });
    });
  });

  // 初始化 links
  model.forEach((layer, i) => {
    layer.forEach((neuron, j) => {
      neuron[1].forEach((conn, k) => {
        links.push({
          source: `${i - 1}-${k}`,
          target: `${i}-${j}`,
          value: conn,
        });
      });
    });
  });

  const option: ECOption = {
    series: [
      {
        type: "graph",
        symbolSize: 50,
        label: {
          show: true,
          formatter: (params) => `${params.value}`.substring(0, 5),
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          show: true,
          position: "insideStart",
          padding: [0, 50],
          formatter: (params) => `${params.value}`.substring(0, 5),
        },
        nodes,
        links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  };

  chart.setOption(option);
  const svg = chart.renderToSVGString();

  return new Response(svg, {
    headers: { "content-type": "image/svg+xml" },
  });
};

function getModel(name: string) {
  if (name === "and_gate") {
    return and;
  } else if (name === "or_gate") {
    return or;
  } else if (name === "not_gate") {
    return not;
  } else if (name === "add") {
    return add;
  }

  return basic;
}
