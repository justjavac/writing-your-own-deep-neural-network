import { useEffect, useRef, useState } from "preact/hooks";
// @deno-types="https://esm.sh/echarts@5.4.2"
import {
  ComposeOption,
  GraphSeriesOption,
  init,
  TooltipComponentOption,
} from "echarts";
import type { Model } from "@/dnn/model.ts";

type ECOption = ComposeOption<GraphSeriesOption | TooltipComponentOption>;

export interface GraphProps {
  model: Model;
}

export function Graph({ model }: GraphProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = init(el.current!);

    const nodes: GraphSeriesOption["nodes"] = [];
    const links: GraphSeriesOption["links"] = [];

    // 初始化 nodes
    model.forEach((layer, i) => {
      layer.forEach((neuron, j) => {
        nodes.push({
          name: `${i}-${j}`,
          x: (500 / model.length) * i,
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
      animationEasingUpdate: "quinticInOut",
      tooltip: {},
      series: [
        {
          type: "graph",
          symbolSize: 50,
          draggable: true,
          tooltip: {
            formatter: (params) => {
              if (params.dataType === "node") {
                return `bias = ${params.value}`;
              }
              if (params.dataType === "edge") {
                return `weight = ${params.value}`;
              }
              return "";
            },
          },
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
  }, [model]);

  return <div ref={el} class="flex flex-col flex-grow w-full h-full"></div>;
}
