import { useEffect, useRef, useState } from "preact/hooks";
// @deno-types="https://esm.sh/echarts@5.4.2"
import { ComposeOption, EChartsType, GraphSeriesOption, init, TooltipComponentOption } from "echarts";
import type { Model } from "@/dnn/model.ts";

type ECOption = ComposeOption<GraphSeriesOption | TooltipComponentOption>;

export interface GraphProps {
  title: string;
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
                if (!Array.isArray(params.value)) {
                  throw new Error("Not Reachable");
                }
                if (isNaN(params.value[0] as number)) {
                  return `output = <strong>${params.value[1]}</strong>`;
                }
                return `bias = ${params.value[0]}<br/>output = <strong>${params.value[1]}</strong>`;
              }
              if (params.dataType === "edge") {
                return `weight = ${params.value}`;
              }
              return "";
            },
          },
          label: {
            show: true,
            formatter: (params) => {
              if (!Array.isArray(params.value)) {
                throw new Error("Not Reachable");
              }
              const bias = `${params.value[0]}`.substring(0, 5);
              const output = `${params.value[1]}`.substring(0, 5);
              if (isNaN(params.value[0] as number)) {
                return `{bias|}\n{output|${output}}`;
              }
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
                fontSize: 16,
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
            formatter: (params) => `${params.value}`.substring(0, 4),
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
