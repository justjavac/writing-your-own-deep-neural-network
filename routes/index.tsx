import { Handlers, PageProps } from "$fresh/server.ts";
// @deno-types="https://esm.sh/echarts@5.4.2"
import { GraphSeriesOption } from "echarts";
import NotGate from "@/islands/NotGate.tsx";
import type { Model } from "@/dnn/model.ts";

export const handler: Handlers<Model | null> = {
  async GET(_req, ctx) {
    const modle = await import(`@/models/basic.json`, {
      assert: { type: "json" },
    });
    if (!modle) {
      return new Response("Modle not found", { status: 404 });
    }
    return ctx.render(modle.default as Model);
  },
};

export default function Home({ data: model, params }: PageProps<Model | null>) {
  const nodes: GraphSeriesOption["nodes"] = [];
  const links: GraphSeriesOption["links"] = [];

  if (model == null) {
    return "404";
  }

  return <NotGate model={model} title="与门" />;
}
