import { Handlers, PageProps } from "$fresh/server.ts";
import AndGate from "@/islands/AndGate.tsx";
import NotGate from "@/islands/NotGate.tsx";
import Add from "@/islands/Add.tsx";
import type { Model } from "@/dnn/model.ts";

export const handler: Handlers<Model | null> = {
  async GET(req, ctx) {
    const modle = await import(`@/models/${ctx.params.name}.json`, {
      assert: { type: "json" },
    });
    if (!modle) {
      return new Response("Modle not found", { status: 404 });
    }
    return ctx.render(modle.default as Model);
  },
};

export default function Home({ data: model, params }: PageProps<Model | null>) {
  if (model == null) {
    return "404";
  }

  if (params.name === "and_gate") {
    return <AndGate model={model} title="与门" />;
  } else if (params.name === "or_gate") {
    return <AndGate model={model} title="或门" />;
  } else if (params.name === "not_gate") {
    return <NotGate model={model} title="非门" />;
  } else if (params.name === "add") {
    return <Add model={model} title="十以内加法" />;
  }

  return "404";
}
