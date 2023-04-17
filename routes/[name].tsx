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
    return (
      <AndGate
        layers={and.map((x) => x.length)}
        modelName="and_gate"
        title="与门"
      />
    );
  } else if (params.name === "or_gate") {
    return (
      <AndGate
        layers={or.map((x) => x.length)}
        modelName="or_gate"
        title="或门"
      />
    );
  } else if (params.name === "not_gate") {
    return (
      <NotGate
        layers={not.map((x) => x.length)}
        modelName="not_gate"
        title="非门"
      />
    );
  } else if (params.name === "add") {
    return (
      <Add
        layers={add.map((x) => x.length)}
        modelName="add"
        title="十以内加法"
      />
    );
  }

  return "404";
}
