import { PageProps } from "$fresh/server.ts";
import AndGate from "@/islands/AndGate.tsx";
import NotGate from "@/islands/NotGate.tsx";
import Add from "@/islands/Add.tsx";

export default function Home({ params }: PageProps) {
  if (params.name === "and_gate") {
    return (
      <AndGate
        layers={[2, 5, 5, 1]}
        modelName="and_gate"
        title="与门"
      />
    );
  } else if (params.name === "or_gate") {
    return (
      <AndGate
        layers={[2, 5, 5, 1]}
        modelName="or_gate"
        title="或门"
      />
    );
  } else if (params.name === "not_gate") {
    return (
      <NotGate
        layers={[1, 5, 5, 1]}
        modelName="not_gate"
        title="非门"
      />
    );
  } else if (params.name === "add") {
    return (
      <Add
        layers={[10, 5, 5, 10]}
        modelName="add"
        title="十以内加法"
      />
    );
  }

  return "404";
}
