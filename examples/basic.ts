import { Network } from "@/dnn/network.ts";

const layers = [
  1, // 输入层
  1, // 输出层
];

const network = new Network(layers);

const trainingData = [
  {
    input: [0],
    output: [1],
  },
  {
    input: [1],
    output: [0],
  },
];

for (let i = 0; i < 10_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

await Deno.writeTextFile("models/basic.json", JSON.stringify(network.exportModel()));

console.log(network.predict([0]));
console.log(network.predict([1]));
