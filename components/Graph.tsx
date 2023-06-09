import { useEffect, useRef, useState } from "preact/hooks";
// @deno-types="https://esm.sh/echarts@5.4.2"
import { ComposeOption, EChartsType, GraphSeriesOption, init, TooltipComponentOption } from "echarts";
import type { Model } from "@/dnn/model.ts";

type ECOption = ComposeOption<GraphSeriesOption | TooltipComponentOption>;

export interface GraphProps {
  title?: string;
  model?: Model;
  loading?: boolean;
}

export function Graph({ model, title, loading }: GraphProps) {
  const el = useRef<HTMLDivElement>(null);
  const echat = useRef<EChartsType>();

  useEffect(() => {
    echat.current = init(el.current!);

    const nodes: GraphSeriesOption["nodes"] = [];
    const links: GraphSeriesOption["links"] = [];

    if (model != null) {
      // 初始化 nodes
      model.forEach((layer, i) => {
        layer.forEach((neuron, j) => {
          nodes.push({
            name: `${i}-${j}`,
            x: (500 / model.length) * i,
            y: (500 / (layer.length + 1)) * (j + 1),
            value: [i === 0 ? NaN : neuron[0], neuron[1]],
          });
        });
      });

      // 初始化 links
      model.forEach((layer, i) => {
        layer.forEach((neuron, j) => {
          neuron[2].forEach((conn, k) => {
            links.push({
              source: `${i - 1}-${k}`,
              target: `${i}-${j}`,
              value: conn,
            });
          });
        });
      });
    }

    const option: ECOption = {
      title: {
        text: title,
      },
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
                if (!Array.isArray(params.value)) throw new Error("Not Reachable");
                if (Number.isNaN(params.value[0] as number)) return "";

                const bias = toFixed(params.value[0] as number, 10);
                const output = toFixed(params.value[1] as number, 10);
                return `偏置: ${bias}<br/>输出: <strong>${output}</strong>`;
              }
              if (params.dataType === "edge") {
                return `权重: ${toFixed(params.value as number, 10)}`;
              }
              return "";
            },
          },
          label: {
            show: true,
            formatter: (params) => {
              if (!Array.isArray(params.value)) throw new Error("Not Reachable");
              const bias = toFixed(params.value[0] as number, 4);
              const output = toFixed(params.value[1] as number, 4);
              if (Number.isNaN(params.value[0] as number)) return `{bias|}\n{output|${output}}`;
              return `{bias|${bias}}\n{output|${output}}`;
            },
            offset: [0, -5],
            rich: {
              bias: {
                fontSize: 10,
                align: "center",
                color: "#996",
                height: 10,
              },
              output: {
                fontWeight: "bold",
                align: "center",
                height: 50,
              },
            },
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            show: true,
            fontSize: 10,
            position: "insideStart",
            padding: [0, 50],
            offset: [0, -10],
            formatter: (params) =>
              typeof params.value === "number" ? toFixed(params.value, 4) : params.value.toString(),
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

    echat.current.setOption(option);
  }, [model]);

  useEffect(() => {
    if (echat.current == null) return;
    if (loading) {
      echat.current.showLoading();
    } else {
      echat.current.hideLoading();
    }
  }, [loading]);

  return <div ref={el} class="flex flex-col flex-grow w-full h-full"></div>;
}

function toFixed(x: unknown, len?: number) {
  if (typeof x === "number") return parseFloat(x.toFixed(len)).toString();
  return String(x);
}
