import { Network } from "@/dnn/network.ts";

const layers = [
  2, // 输入层
  2, // 隐藏层
  1, // 输出层
];

const network = new Network(layers);

const trainingData = [
  {
    input: [0, 0],
    output: [1],
  },
  {
    input: [1, 1],
    output: [1],
  },
  {
    input: [0, 1],
    output: [0],
  },
  {
    input: [1, 0],
    output: [0],
  },
];

for (let i = 0; i < 100_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

console.log(network.predict([0, 0]));
console.log(network.predict([1, 1]));
console.log(network.predict([1, 0]));
console.log(network.predict([0, 1]));
