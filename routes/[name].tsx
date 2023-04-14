import { PageProps } from "$fresh/server.ts";
import AndGate from "@/islands/AndGate.tsx";
import NotGate from "@/islands/NotGate.tsx";
import Add from "@/islands/Add.tsx";
import type { Model } from "@/dnn/model.ts";
import and from "@/models/and_gate.json" assert { type: "json" };
import or from "@/models/or_gate.json" assert { type: "json" };
import not from "@/models/not_gate.json" assert { type: "json" };
import add from "@/models/add.json" assert { type: "json" };

export default function Home({ params }: PageProps<Model | null>) {
  if (params.name === "and_gate") {
    return <AndGate model={and as Model} title="与门" />;
  } else if (params.name === "or_gate") {
    return <AndGate model={or as Model} title="或门" />;
  } else if (params.name === "not_gate") {
    return <NotGate model={not as Model} title="非门" />;
  } else if (params.name === "add") {
    return <Add model={add as Model} title="十以内加法" />;
  }

  return "404";
}
