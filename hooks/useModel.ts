import { asset } from "$fresh/runtime.ts";
import { useCallback, useRef, useState } from "preact/hooks";
import { type Model, Network } from "@/dnn/mod.ts";

export function useModel(name: string, layers: number[]) {
  const network = useRef(new Network(layers));
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error>();
  const [model, setModel] = useState<Model>(clean(network.current.exportModel()));

  const resetModel = useCallback(() => {
    if (model == null) return;
    setModel(reset(model));
  }, [model]);

  const loadModel = useCallback(() => {
    setLoading(true);
    fetch(asset(`/api/${name}`))
      .then((res) => res.json())
      .then((model) => {
        network.current = Network.fromModel(model);
        setModel(reset(model));
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return { loading, model, setModel, loadModel, resetModel, error, network: network.current, loaded };
}

function reset(model: Model): Model {
  return model.map((layer) => layer.map((neuron) => [neuron[0], 0, neuron[2]]));
}

function clean(model: Model): Model {
  return model.map((layer) => layer.map((neuron) => [0, 0, neuron[2].map(() => 0)]));
}
